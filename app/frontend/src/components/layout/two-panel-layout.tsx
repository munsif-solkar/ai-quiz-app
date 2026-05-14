export default function TwoPanelLayout({
  left,
  right,
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    // make this reposonsive with flex-col on small screens and flex-row on medium and above
    
    <div className="flex w-full gap-5 relative md:flex-row flex-col items-start">
      
      <div className="w-full lg:w-[400px]">{left}</div>
      <div className="w-full lg:w-[900px]">{right}</div>
      
    </div>
  )
}
