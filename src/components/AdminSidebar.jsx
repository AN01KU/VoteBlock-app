import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";


const AdminSidebar = () => {
    const auth = getAuth()
    const navigate = useNavigate()
    const logout = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="sidebar" data-color="green" data-background-color="white" data-image="./assets/img/sidebar-1.jpg">
            <div className="sidebar-wrapper">
                <ul className="nav" >
                    <li className={(window.location.pathname === "/candidateDetails")?"nav-item active":"nav-item"}>
                        <Link className="nav-link" to="/candidateDetails">
                            <p>Candidate Details</p>
                        </Link>
                    </li>
                    <li className={(window.location.pathname === "/adminHome")?"nav-item active":"nav-item"}>
                        <Link className="nav-link" to="/adminHome">
                            <p>Add Candidate</p>
                        </Link>
                    </li>
                    <li className={(window.location.pathname === "/table_view")?"nav-item active":"nav-item"}>
                        <Link className="nav-link" to="/table_view">
                            <p>Register</p>
                        </Link>
                    </li>
                    <li className={(window.location.pathname === "/changePhase")?"nav-item active":"nav-item"}>
                        <Link className="nav-link" to="/changePhase">
                            <p>Change State</p>
                        </Link>
                    </li>
                    <li className={(window.location.pathname === "/logout")?"nav-item active":"nav-item"}>
                        <Link className="nav-link" onClick={logout} >
                        <p>LogOut</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default AdminSidebar