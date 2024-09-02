import React, { useState } from 'react';
import config from '../../config.json'

const LogIn = ({ setIsLoggedIn }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const [loginDisabled, setLoginDisabled] = useState(false);

    const onSubmitLogin = async (e) => {

        e.preventDefault()

        setError('')

        setLoginDisabled(true);

        try {
            const response = await fetch(config.API_URL + '/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            if (response.status != 200) throw response.status;

            if (response.status == 200) {
                console.log('asdasd');
                setIsLoggedIn(true)
            }
        }

        catch (e) {
            console.log(e);
            setLoginDisabled(false);
            if (e == 401) {
                setError(e + ' Wrong username or password')
            }
            if (e == 400) {
                setError(e + ' Invalid username or password')
            }
            if (e == 404) {
                setError(e + ' Server Error')
            }
        }

    }

    return (
        <section className="w-screen h-screen flex justify-center items-center bg-gradient-to-bl from-[#378CE7] to-[#b91c1c]">
            <div className="w-[40%] flex flex-col items-center justify-center px-6 py-8 mx-auto ">
                <div className="w-full bg-gray-50 rounded-lg shadow ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl select-none text-center">
                            Sign In
                        </h1>

                        {
                            error && (
                                <div className="font-bold leading-tight tracking-tight text-red-600">
                                    {error}
                                </div>
                            )
                        }

                        <form className="space-y-4 md:space-y-6" action="#" onSubmit={onSubmitLogin}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">username</label>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#378CE7] focus:border-[#378CE7] block w-full p-2.5 " placeholder="name@company.com" required={true} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#378CE7] focus:border-[#378CE7] block w-full p-2.5 " required={false} />
                            </div>

                            <button disabled={loginDisabled}
                                type="submit"
                                className="disabled:bg-gray-400 disabled:text-black w-full text-white bg-[#378CE7] hover:bg-[#378CE7] 
                            focus:ring-4 focus:outline-none focus:ring-[#378CE7] font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LogIn;
