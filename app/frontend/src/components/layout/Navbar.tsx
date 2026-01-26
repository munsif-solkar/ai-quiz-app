export default function Navbar() {
    return (<>
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
            <a href="/" className="flex flex-row items-center gap-5">
                <img className="h-12" src="https://cdn-icons-png.flaticon.com/128/17198/17198172.png" alt="logo" />
                <p className="text-2xl font-medium">Ai Quiz Generator</p>
            </a>
           
        </div>
    </>)
}