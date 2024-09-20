import './App.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import CreateAccountPage from './Pages/CreateAccountPage'

const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<CreateAccountPage />}/>
      <Route path='/createaccount' element={<CreateAccountPage />}/>
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={browserRouter}/>
    </>
  )
  
}

export default App
