import './App.css';
import SignUp from './components/authentication/SignUp';
import AuthProvider from './contexts/AuthContext';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Profile from './components/authentication/Profile';
import Login from './components/authentication/Login';
import ForgotPassword from './components/authentication/ForgotPassword';
import UpdateProfile from './components/authentication/UpdateProfile';
import Dashboard from './components/drive/Dashboard';

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            {/* ZapStorage */}
            <Route exact path='/' element={<Dashboard />} />
            <Route exact path='/folders/:folderId' element={<Dashboard />} />

            {/* Profile */}
            <Route exact path='/user' element={<Profile />} />
            <Route exact path='/update-profile' element={<UpdateProfile />} />

            {/* Authentication */}
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
