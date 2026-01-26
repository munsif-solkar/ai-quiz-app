export default function TwoPanelLayout({
  left,
  right,
}: {
  left: React.ReactNode
  right: React.ReactNode
}) {
  return (
    <div className="flex gap-6 ">
      <div className="w-1/3 bg-gray-50 p-4 rounded shadow">{left}</div>
      <div className="flex-1 bg-white p-4 rounded shadow">{right}</div>
    </div>
  )
}
