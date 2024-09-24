import './App.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import CreateAccountPage from './Pages/CreateAccountPage'
import LoginPage from './Pages/LoginPage'
import TokenProvider from './providers/tokenProvider'
import FeedPage from './Pages/FeedPage'


const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<CreateAccountPage />}/>
      <Route path='/createaccount' element={<CreateAccountPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/feed' element={<FeedPage />}/>
    </Route>
  )
)

function App() {
  return (
    <>
      <TokenProvider>
        <RouterProvider router={browserRouter}/>
      </TokenProvider>
    </>
  )
  
}

export default App
