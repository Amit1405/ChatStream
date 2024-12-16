import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import socketIO from 'socket.io-client';
import Home from './components/Home';
import ChatPage from './pages/ChatPage';
import {AuthProvider,useAuth} from './utills/AuthContext';
const socket=socketIO.connect('http://localhost:5000');
function App() {
  const PrivateRoute=({children}) => {
    const {isLoggedIn}=useAuth();
    const isAuthenticated=isLoggedIn
    return isAuthenticated? children:<Navigate to="/" />;
  };
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home socket={socket} />} />
          <Route path="/chat" element={<PrivateRoute><ChatPage socket={socket} /></PrivateRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
