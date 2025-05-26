import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Todo from "./pages/Todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
   <BrowserRouter>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
