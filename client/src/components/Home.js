import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../utills/AuthContext';

const Home=({socket}) => {
  const navigate=useNavigate();
  const [userName,setUserName]=useState('');
  const {setIsLoggedIn}=useAuth();

  const handleSubmit=(e) => {
    e.preventDefault();
    localStorage.setItem('username',userName);
    socket.emit('newUser',{userName,socketID: socket.id});
    setIsLoggedIn(true)
    navigate('/chat');
  };
  return (
    <div className='login'>
      <div className='login-form'>
        <form onSubmit={handleSubmit}>
          <h2>Welcome <span>&#128079;</span></h2>
          <p>Sign in to Chat Stream</p>
          <input
            type="text"
            minlength={4}
            name="username"
            id="username"
            placeholder='username'
            value={userName}
            className="form-control inp_text"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <button >SIGN IN</button>
        </form>
      </div>
    </div>
  );
};

export default Home;

