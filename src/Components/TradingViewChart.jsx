import axios from 'axios';
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { subHours } from "date-fns"
import { TZDate } from "@date-fns/tz";


export const ChartComponent = ({ symbol, fullScreen, colors: {
    backgroundColor = '#172036',
    lineColor = '#2962FF',
    textColor = 'white',
    areaTopColor = '#2962FF',
    areaBottomColor = 'rgba(41, 98, 255, 0.28)',
} = {} }) => {

    const [data, setData] = useState([])
    const [vwapData, setVwapData] = useState([])

    const chartContainerRef = useRef();

    const [chart, setChart] = useState(null)

    const [seires, setSeries] = useState([])

    const API_KEY = '7YMVUTMTVK43PYJV'; // Replace with your actual API key
    const INTERVAL = '1min'; // Time interval (e.g., 1min, 5min, 15min, etc.)

    useEffect(
        () => {

            const handleResize = () => {
                chart.applyOptions({ width: chartContainerRef.current.clientWidth });
            };

            const chart = createChart(chartContainerRef.current, {
                layout: {
                    background: { type: ColorType.Solid, color: backgroundColor },
                    textColor
                },
                width: chartContainerRef.current.clientWidth,
                height: fullScreen ? 800 : 300,
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true,
                },
                grid: {
                    vertLines: {
                        visible: false, // Disable vertical grid lines
                    },
                    horzLines: {
                        visible: false, // Disable horizontal grid lines
                    },
                },

            });

            // chart.timeScale().fitContent()
            // chart.timeScale().resetTimeScale()


            setChart(chart)
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);

                chart.remove();
            };
        },
        []);





    function timeToTz(originalTime, timeZone) {

        const timezoned = new Date(originalTime).toLocaleString('en-US', {
            timeZone: 'America/New_York'
        })

        console.log(new Date(timezoned).getTime() / 1000, originalTime)

        return new Date(timezoned).getTime() / 1000
    }


    useEffect(() => {

        const fetchVWAP = async () => {
            try {
                const response = await axios.get(
                    `https://www.alphavantage.co/query`,
                    {
                        params: {
                            function: 'VWAP',
                            symbol: symbol,
                            interval: INTERVAL,
                            apikey: API_KEY,
                            extended_hours: true,
                            entitlement: 'realtime',
                            outputsize: 'full'
                        }
                    }
                );


                const timeSeriesData = response.data[`Technical Analysis: VWAP`];
                console.log(timeSeriesData);

                const chartData = []
                for (let time in timeSeriesData) {
                    const obj = timeSeriesData[time]
                    chartData.push({
                        // time: new Date(new Date(time).toUTCString()).getTime() / 1000,
                        time: subHours(new Date(time), 8).getTime() / 1000,
                        // time: subHours(new TZDate(time, "America/New_York"), 5).getTime() / 1000,
                        // time: new Date(time).getTime() / 1000,
                        // time: timeToTz(time, 'America/New_York'),
                        value: parseFloat(obj['VWAP']),
                    })
                }
                setVwapData(chartData.sort((a, b) => a.time - b.time));

            } catch (err) {
                console.log(err);
            }
        };


        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://www.alphavantage.co/query`,
                    {
                        params: {
                            function: 'TIME_SERIES_INTRADAY',
                            symbol: symbol,
                            interval: INTERVAL,
                            apikey: API_KEY,
                            extended_hours: true,
                            entitlement: 'realtime',
                            outputsize: 'full'
                        }
                    }
                );


                const timeSeriesData = response.data[`Time Series (${INTERVAL})`];
                console.log(timeSeriesData);

                const chartData = []
                for (let time in timeSeriesData) {
                    const obj = timeSeriesData[time]
                    chartData.push({
                        // time: new Date(new Date(time).toUTCString()).getTime() / 1000,
                        time: subHours(new Date(time), 8).getTime() / 1000,
                        // time: subHours(new TZDate(time, "America/New_York"), 5).getTime() / 1000,
                        // time: new Date(time).getTime() / 1000,
                        // time: timeToTz(time, 'America/New_York'),
                        open: parseFloat(obj['1. open']),
                        high: parseFloat(obj['2. high']),
                        low: parseFloat(obj['3. low']),
                        close: parseFloat(obj['4. close']),
                        volume: parseFloat(obj['5. volume'])
                    })
                }

                await fetchVWAP()
                setData(chartData.sort((a, b) => a.time - b.time));

                try {
                    for (let s of seires) {
                        chart.removeSeries(s);
                    }
                }
                catch (e) {
                    console.log(s)
                }

            } catch (err) {
                console.log(err);
            }
        };



        fetchData();

        const intervalId = setInterval(fetchData, 60000); // Fetch new data every minute


        console.log(data);


        return () => {
            clearInterval(intervalId);
        };
    }, [symbol])

    useEffect(() => {

        if (!chart) return
        if (data.length === 0) return

        const newSeries = chart.addCandlestickSeries({ upColor: '#089981', downColor: '#F23645', borderVisible: false, wickUpColor: '#26a69a', wickDownColor: '#ef5350' });
        newSeries.setData(data);

        const calculateEMA = (data, period) => {
            const k = 2 / (period + 1);
            let emaArray = [];
            let ema = data[0].close; // Start with the first close value

            data.forEach((x, index) => {
                if (index === 0) {
                    emaArray.push({ time: x.time, value: ema });
                } else {
                    ema = x.close * k + ema * (1 - k);
                    emaArray.push({ time: x.time, value: ema });
                }
            });

            return emaArray;
        };

        const calculateSMA = (data, period) => {
            let smaArray = [];
            for (let i = period - 1; i < data.length; i++) {
                const sum = data.slice(i - period + 1, i + 1).reduce((acc, x) => acc + x.close, 0);
                const sma = sum / period;
                smaArray.push({ time: data[i].time, value: sma });
            }
            return smaArray;
        };

        function calculateVWAP(data) {
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error("Data must be a non-empty array.");
            }

            let cumulativeValue = 0; // Cumulative sum of (close * volume)
            let cumulativeVolume = 0; // Cumulative sum of volume

            const vwapArray = [];

            for (const item of data) {
                if (typeof item.close !== 'number' || typeof item.volume !== 'number' || !item.time) {
                    throw new Error("Each data point must have 'close', 'volume', and 'time' properties.");
                }

                // Update cumulative values
                cumulativeValue += item.close * item.volume;
                cumulativeVolume += item.volume;

                // Calculate VWAP
                const vwapValue = cumulativeVolume === 0 ? 0 : cumulativeValue / cumulativeVolume;

                // Append result
                vwapArray.push({ time: item.time, value: vwapValue });
            }

            return vwapArray;
        }

        const ema10 = calculateEMA(data, 10)
        const indEMA10 = chart.addLineSeries({
            lineWidth: 1
        })
        indEMA10.setData(ema10)

        const ema130 = calculateEMA(data, 130)
        const indEMA130 = chart.addLineSeries({
            lineWidth: 2,
            color: 'red'
        })
        indEMA130.setData(ema130)


        const sma130 = calculateSMA(data, 130)
        console.log(sma130)
        const indSMA130 = chart.addLineSeries({
            color: 'yellow',
            lineWidth: '2'
        })
        indSMA130.setData(sma130)


        console.log('Vwap', vwapData)
        const inVwap = chart.addLineSeries({
            color: 'orange',
            lineWidth: '2'
        })
        inVwap.setData(vwapData)

        const volumeSeries = chart.addHistogramSeries({
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '', // set as an overlay by setting a blank priceScaleId
        });
        volumeSeries.priceScale().applyOptions({
            // set the positioning of the volume series
            scaleMargins: {
                top: 0.7, // highest point of the series will be 70% away from the top
                bottom: 0,
            },
        });

        volumeSeries.setData(data.map(x => ({
            time: x.time,
            value: x.volume,
            color: (x.close > x.open) ? '#089981' : '#F23645'
        })))

        chart.timeScale().applyOptions({
            barSpacing: 10,
        });

        setSeries([
            inVwap,
            volumeSeries,
            indEMA10,
            indEMA130,
            indSMA130,
            newSeries
        ])

        // const interval = setInterval(() => {
        //     chart.removeSeries(volumeSeries)
        //     chart.removeSeries(newSeries)
        //     chart.removeSeries(indEMA10)
        //     chart.removeSeries(indEMA130)
        //     chart.removeSeries(indSMA130)
        //     chart.removeSeries(inVwap)
        // }, 60000)

    }, [data])

    return (
        <div
            ref={chartContainerRef}
        />
    );
};

