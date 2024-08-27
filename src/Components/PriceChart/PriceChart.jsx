import React from 'react'

export default function PriceChart({ src }) {
    return (
        src ? (
            <div className='flex flex-col justify-start items-center h-[90%] w-full border-t p-2'>
                <img className='h-[100%]' src={src} alt="" />
            </div>
        ) : (
            <div className='flex w-full h-full justify-center items-center text-xl'>
                Please select a ticker to display its price chart :)
            </div>
        )

    )
}
