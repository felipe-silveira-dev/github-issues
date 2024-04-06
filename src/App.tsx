import { BrowserRouter } from "react-router-dom"
import Router from "./Router"
import './App.css'
import './index.css'

function App() {

  

  return (
    <>
      <BrowserRouter>
        <div>
          {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
          <div className="lg:pl-72">
            {/* <Header setSidebarOpen={setSidebarOpen} /> */}
            <main className="main-container">
              <Router />
            </main>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
