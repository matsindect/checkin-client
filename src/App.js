import logo from './logo.svg';
import './App.css';
import Signup from "./signup"
import SignIn from './signin';
import ThankYou from './thank-you'
import { BrowserRouter as Router, Routes, Route, Navigate,Link } from "react-router-dom"
function App() {
  
  return (
    <div className="App">
     <Router>
        <Routes>
        <Route path="/" element={<Navigate to="thank-you" replace />} />
      <Route path="/login" element={<SignIn/>}/>
      <Route path="thank-you" element={<ThankYou />} />
      <Route path="signup" element={<Signup />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
