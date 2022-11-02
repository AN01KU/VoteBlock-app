import React from 'react';
import img from '../assets/img/home_page.png';
//import '../css/index.css';
import { Link } from "react-router-dom";

export const Body = () => {
    return (
        <section>
            <div className="leftside">
                <img src={img}/>
            </div>
            <div className="rightside">
                <h1>Vote!</h1>     
                <p> LET YOUR VOICE BE HEARD! </p>           
                <Link to="/register"><button >Login/Register</button></Link>
                <Link to="/adlogin"><button>ADMIN-LOGIN</button></Link>
            </div>
        </section>
        
    );
}

export default Body;