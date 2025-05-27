import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Todo from "./pages/Todo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";



function App() {

  return (
   <BrowserRouter>

      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/Signup" element={<Signup />} /> */}
        {/* <Route path="/todo" element={<Todo />} /> */}

         <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
  path="/"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
      </Routes>
   </BrowserRouter>
  );
}
  
export default App;
