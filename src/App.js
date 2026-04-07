import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import RoleSelection from './pages/RoleSelection';
import AdminLogin from './pages/AdminLogin';
import UserLogin from './pages/UserLogin';
import AdminRegister from './pages/AdminRegister';
import UserRegister from './pages/UserRegister';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Training from './pages/Training';
import Community from './pages/Community';
import Profile from './pages/Profile';
import RolesResponsibilities from './pages/RolesResponsibilities';
import ProductApproval from './pages/ProductApproval';
import Orders from './pages/Orders';
import './App.css';

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute adminOnly><AdminDashboard /></PrivateRoute>} />
          <Route path="/user-dashboard" element={<PrivateRoute><UserDashboard /></PrivateRoute>} />
          <Route path="/products" element={<Products />} />
          <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
          <Route path="/training" element={<PrivateRoute><Training /></PrivateRoute>} />
          <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/roles" element={<PrivateRoute><RolesResponsibilities /></PrivateRoute>} />
          <Route path="/product-approval" element={<PrivateRoute adminOnly><ProductApproval /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
