import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Locate from './location/locate'
import First from './home/first'
import Second from './home/second'
import Show from './Timeline/show'
import Calu from './Caluculate'
import Food from './Timeline/food'

const router = createBrowserRouter([
  {
    path:"/map",
    element:<Locate/>
  },
  {
    path:"/first",
    element:<First/>
  },
  {
    path:"/second",
    element:<Second/>
  },
  {
    path:"/show",
    element:<Show/>
  },
  {
    path:"/cal",
    element:<Calu/>
  }, {
    path:"/food",
    element:<Food/>
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  )
}

export default App
