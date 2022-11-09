import React from 'react';
import '../css/index.css';
import { Link } from "react-router-dom";
import img from "../assets/img/block1.png";


export const Body = () => {
    return (
        <section>
        <div className="leftside">
          <img className="logo1" src={img} alt="" />
        </div>
        <div className="rightside">
          <h1>A secure blockchain based Voting</h1>
          <p>
            If you don’t care for obscenity, you don’t care for the truth; if you
            don’t care for the truth, watch how you vote{" "}
          </p>
          <Link to="/register">
            <button>Login/Register</button>
          </Link>
          <Link to="/adlogin">
            <button>ADMIN-LOGIN</button>
          </Link>
        </div>
      </section>
        
    );
}

export default Body;