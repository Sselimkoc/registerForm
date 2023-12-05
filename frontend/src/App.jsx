import RegisterPage from "./components/RegisterPage";
import Homepage from "./components/Homepage";
import "./assets/registerPageStyle.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegisterPage />}></Route>
          <Route path="/login" element={<RegisterPage />}></Route>
          <Route path="/home" element={<Homepage />}></Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
