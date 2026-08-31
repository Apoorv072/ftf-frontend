import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateAccount from "./pages/CreateAccount";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-account" element={<CreateAccount />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;