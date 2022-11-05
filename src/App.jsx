import { Form } from './Pages/Form';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './Pages/LandingPage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import AdminLogin from './Pages/AdminLogin';
import Dashboard from './Pages/Dashboard';
import AdminHome from './Pages/AdminHome';
import AdminCandidateDetail from './Pages/AdminCandidateDetail';
import AdminChangePhase from './Pages/AdminChangePhase';
import { AdminVoterRegister } from './Pages/AdminVoterRegister';
import Result from './Pages/Result';
import { useState, useEffect } from "react"


export const App = () => {
    const [walletAddress, setWalletAddress] = useState(null);

    useEffect(() => {
        (async () => {
            if (window.ethereum) {
                try {
                    const accounts = await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    })
                    setWalletAddress(accounts[0])
                } catch (error) {
                    console.log("error connecting to accounts");
                }
            } else {
                console.log('no metamask');
            }
        })()
    }, [])

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/form' element={<Form />} />
                    <Route path='/adlogin' element={<AdminLogin />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/adminHome' element={<AdminHome />} />
                    <Route path='/candidateDetails' element={<AdminCandidateDetail />} />
                    <Route path='/changePhase' element={<AdminChangePhase />} />
                    <Route path='/table_view' element={<AdminVoterRegister />} />
                    <Route path='/result' element={<Result />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;