import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import Home from "./Home";
import {MyContext} from "./MyContext.jsx";
import { useState } from 'react';
import {v1 as uuidv1} from "uuid";
import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); //stores all chats of curr threads
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  const [user, setUser] = useState(null);

  const [theme, setTheme] = useState(
  localStorage.getItem("theme") || "dark"
);
useEffect(() => {

  document.body.className = theme;

  localStorage.setItem("theme", theme);

}, [theme]);
  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    user,setUser,
    theme, setTheme
  }; 
  useEffect(() => {

  const storedUser = localStorage.getItem("user");

  if(storedUser){
    setUser(JSON.parse(storedUser));
  }

}, []);

    return (
  <div className='app'>

    <MyContext.Provider value={providerValues}>

      <Routes>
        <Route path="/Home" element={<Home />} />
        
        

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Signup />} />

<Route
  path="/"
  element={
    
      <>
        <Sidebar />
        <ChatWindow />
      </>
    
  }
/>
        {/* <Route
          path="/login"
          element={
            user ? <Navigate to="/" /> : <Login />
          }
        />

        
        <Route
          path="/register"
          element={
            user ? <Navigate to="/" /> : <Signup />
          }
        />

        
        <Route
          path="/"
          element={
            user ? (
              <>
                <Sidebar />
                <ChatWindow />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        /> */}

      </Routes>

    </MyContext.Provider>

  </div>

    // <div className='app'>
    //   <MyContext.Provider value={providerValues}>
    //       {
    //   user ? (
    //     <>
    //       <Sidebar />
    //       <ChatWindow />
    //     </>
    //   ) : (
    //     <Login />
    //   )
    // }
    //     </MyContext.Provider>
    // </div>
  )
}

export default App