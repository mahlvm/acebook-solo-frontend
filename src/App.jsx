import './App.css'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import CreateAccountPage from './Pages/CreateAccountPage'
import LoginPage from './Pages/LoginPage'
import TokenProvider from './providers/tokenProvider'
import FeedPage from './Pages/FeedPage'
import ProfilePage from './Pages/ProfilePage'
import "@fontsource/quicksand"; 
import "@fontsource/quicksand/400.css"; 
import "@fontsource/quicksand/700.css"; 
import UsersPage from './components/NewFriends'




const browserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<CreateAccountPage />}/>
      <Route path='/createaccount' element={<CreateAccountPage />}/>
      <Route path='/login' element={<LoginPage />}/>
      <Route path='/feed' element={<FeedPage />}/>
      <Route path='/profile' element={<ProfilePage />}/>
      <Route path='/users' element={<UsersPage />}/>
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
