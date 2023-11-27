import { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/Homepage/Homepage'
import LoginScreen from './pages/Auth/LoginScreen/LoginScreen'
import LoginDelegationScreen from './pages/Auth/LoginDelegationScreen/LoginDelegationScreen'
import StudentScreen from './pages/Student/StudentScreen'
import AdvisorScreen from './pages/Advisor/AdvisorScreen'
function App() {
  const navigate = useNavigate()
  interface RootState {
    userReducer: {
      role: string
      loggedIn: boolean
    }
  }
  const role = useSelector((state: RootState) => state.userReducer.role)
  const isLoggedIn = useSelector((state: RootState) => state.userReducer.loggedIn)
  function getScreenComponentByRole(role: string) {
    switch (role) {
      case 'student':
        return <StudentScreen />
      case 'advisor':
        return <AdvisorScreen />
      case 'council':
        return <AdvisorScreen />
      case 'secretary':
        return <AdvisorScreen />
      default:
        return <StudentScreen />
    }
  }
  useEffect(() => {
    if (isLoggedIn === false || isLoggedIn === null) {
      navigate('/homepage')
    }
  }, [isLoggedIn, navigate])
  return (
    <Routes>
      <Route
        path='/homepage'
        element={
          <>
            <Navbar />
            <Homepage />
          </>
        }
      />
      <Route path='/login_delegation' element={<LoginDelegationScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      {isLoggedIn ? (
        <Route
          path='*'
          element={
            <>
              <Navbar />
              {getScreenComponentByRole(role)}
            </>
          }
        />
      ) : null}
    </Routes>
  )
}

export default App
