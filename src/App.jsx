import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import Transaction from "./pages/Transaction";
import GuestRoute from "./pages/GuestRoute";
import ProtectedRoute from "./pages/ProtectedRoute"; 
import AuthHistoryGuard from "./pages/AuthHistoryGuard";
import AuthWatcher from "./pages/AuthWatcher";
import VerifyOtp from "./pages/VerifyOtp";
import TransactionHistory from "./pages/TransactionHistory";
function App() {
  return (
    <BrowserRouter>
    <AuthWatcher />
    <AuthHistoryGuard />
      <Routes>
  
        
         <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
        </Route>
        
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/transaction-history" element={<TransactionHistory />}
/>    </Route>

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;