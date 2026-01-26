
import React from "react";
import Navbar from "./Navbar";

export default function MainLayout({children}:{children:React.ReactNode}){
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar/>
            <main className="flex-1 container">
        {children}
            </main>
        </div>
    )
}