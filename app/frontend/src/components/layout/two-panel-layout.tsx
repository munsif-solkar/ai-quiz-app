export default function TwoPanelLayout({
  left,
  right,
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <div className="flex w-full justify-around m-5 ">
      
      <div className="">{left}</div>
      <div className="w-[800px]">{right}</div>
      
    </div>
  )
}
