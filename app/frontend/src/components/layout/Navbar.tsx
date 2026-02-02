export default function Navbar() {
    return (<>
        <div className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-[#FFF] relative transition-all">
            <a href="/" className="flex flex-row items-center gap-3">
                <img className="h-10" src="https://cdn-icons-png.flaticon.com/128/18627/18627360.png" alt="logo" />
                <p className="text-lg font-medium text-[#132440]">Ai Quiz Generator</p>
            </a>
           
        </div>
    </>)
}