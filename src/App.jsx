import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/create-account" element={<CreateAccount />} />
        

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;