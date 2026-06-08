// import { useState } from 'react'
// import './App.css'
// import Navbar from './Components/Navbar'
// import Pres1 from './Components/Pres1'
// import Pres2 from './Components/Pres2'
// import Pres3 from './Components/Pres3'
// import Work from './Components/Work'
// import Team from './Components/Team'
// import Contact from './Components/Contact'
// import Footer from './Components/Footer'

// function App() {

//   const [theme, setTheme] = useState(() => {
//     const saved = localStorage.getItem('theme');
//     if (saved) return saved;
//     return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
//   })

//   return (
//     <div className={`relative min-h-screen transition-colors duration-500 overflow-x-hidden ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-950'}`}>
//       <Navbar theme={theme} setTheme={setTheme}  />
//       <Pres1 theme={theme} />
//       <Pres2 theme={theme} />
//       <Pres3 theme={theme} />
//       <Work theme={theme}/>
//       <Team theme={theme}/>
//       <Contact theme={theme}/>
//       <Footer theme={theme}/>
//     </div>
//   )
// }

// export default App





// import React from 'react'
import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import { Route, Routes } from 'react-router-dom'


const App = () => {

  const [sidebar, setSidebar] = useState(true)


  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/video/:categoryId/:videoId' element={<Video />} />
      </Routes>
      {/* <Home sidebar={sidebar} /> */}
      {/* <Video/> */}
    </div>
  )
}

export default App