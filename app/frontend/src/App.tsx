import MainLayout from "./components/layout/main-layout"
import Dashboard from "./pages/dashboard"
function App() {


  return (
    <div className="min-h-screen
    bg-white
    bg-[image:repeating-linear-gradient(315deg,rgba(0,0,0,0.15)_0,rgba(0,0,0,0.15)_1px,transparent_0,transparent_50%)]
    bg-[size:10px_10px]
    bg-fixed">
    <MainLayout>
      
<Dashboard/>
    </MainLayout>
    </div>
  )
}

export default App
