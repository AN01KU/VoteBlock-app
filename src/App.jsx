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
                <Route exact path="/" element={<LandingPage account={walletAddress}/>} />
                    <Route path="/register" element={<Register account={walletAddress}/>} />
                    <Route path="/login" element={<Login account={walletAddress}/>} />
                    <Route path='/home' element={<Home account={walletAddress}/>} />
                    <Route path='/form' element={<Form account={walletAddress}/>} />
                    <Route path='/adlogin' element={<AdminLogin account={walletAddress}/>} />
                    <Route path='/dashboard' element={<Dashboard account={walletAddress}/>} />
                    <Route path='/adminHome' element={<AdminHome account={walletAddress}/>} />
                    <Route path='/candidateDetails' element={<AdminCandidateDetail account={walletAddress}/>} />
                    <Route path='/changePhase' element={<AdminChangePhase account={walletAddress}/>} />
                    <Route path='/table_view' element={<AdminVoterRegister account={walletAddress}/>} />
                    <Route path='/result' element={<Result account={walletAddress}/>} />
                    <Route exact path="/" element={<LandingPage account={walletAddress} />} />
                    <Route path="/register" element={<Register account={walletAddress} />} />
                    <Route path="/login" element={<Login account={walletAddress} />} />
                    <Route path='/home' element={<Home account={walletAddress} />} />
                    <Route path='/form' element={<Form account={walletAddress} />} />
                    <Route path='/adlogin' element={<AdminLogin account={walletAddress} />} />
                    <Route path='/dashboard' element={<Dashboard account={walletAddress} />} />
                    <Route path='/adminHome' element={<AdminHome account={walletAddress} />} />
                    <Route path='/candidateDetails' element={<AdminCandidateDetail account={walletAddress} />} />
                    <Route path='/changePhase' element={<AdminChangePhase account={walletAddress} />} />
                    <Route path='/table_view' element={<AdminVoterRegister account={walletAddress} />} />
                    <Route path='/result' element={<Result account={walletAddress} />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;