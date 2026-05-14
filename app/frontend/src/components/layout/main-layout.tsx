
import React from "react";
import Navbar from "./Navbar";

export default function MainLayout({children}:{children:React.ReactNode}){
    return (
        <div className="flex min-h-screen flex-col justify-center items-center ">
            <Navbar/>
            <main className="flex-1 container flex flex-col justify-center items-center  w-full">
            {children}
            </main>
        </div>
    )
}