export default function TwoPanelLayout({
  left,
  right,
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <div className="flex w-screen justify-center">
      <div className="w-1/2 bg-gray-50 ">{left}</div>
      <div className="w-full bg-white p-5 ">{right}</div>
    </div>
  )
}
