import type { NextPage } from 'next'
import  { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
    const { data } = useSession();

    console.log("HERE IS DATA", data);

    function handleSignIn(type: string) {
        event.preventDefault();
        signIn();
    }  

    return (
        <section className="h-screen">
            <div className="px-6 h-full text-gray-800">
                    {
                        data?.user ? (
                            <button onClick={() => signOut()}
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Sign Out
                            </button>
                        ) : (
                            <button onClick={() => handleSignIn('google')}
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                        Sign In
                            </button>
                    )}
                <br></br>
                <br></br>
                {data?.user?.name}
            </div>
        </section>
    );
}

export default Home;
