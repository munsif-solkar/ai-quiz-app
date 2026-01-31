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
      <div className="w-full bg-white p-5 border border-l-slate-500 border-dashed border-spacing-4">{right}</div>
    </div>
  )
}
