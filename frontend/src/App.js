import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Home from "./components/home/Home";
import MyPage from "./components/MyPage/MyPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
           <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/profile" element={<MyPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
