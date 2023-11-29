import { useEffect } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Homepage from './pages/Homepage/Homepage'
import LoginPage from './pages/Auth/LoginPage/LoginPage'
import LoginDelegationPage from './pages/Auth/LoginDelegationPage/LoginDelegationPage'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
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
      <Route path='/login_delegation' element={<LoginDelegationPage />} />
      <Route path='/login' element={<LoginPage />} />
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
