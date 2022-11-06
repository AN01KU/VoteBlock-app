import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import data_image from '../assets/img/sidebar-1.jpg';
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { getAuth, signOut } from "firebase/auth";

export const Sidebar = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const logout = () => {
    signOut(auth).then(() => {
      localStorage.setItem("currentUserEmail", '')
      navigate('/')
    })
  }
  

  return (
    <div className="sidebar" data-color="azure" data-background-color="white" data-image={data_image}>
      <div className="sidebar-wrapper">
        <ul className="nav" style={{ marginTop: "50px" }}>
          <li className={(window.location.pathname === "/home")?"nav-item active":"nav-item"}>
            <Link to="/home" className='nav-link'>
              <i><ContentPasteIcon /></i>
              <p>Information</p>
            </Link>
          </li>
          <li className={(window.location.pathname === "/form")?"nav-item active":"nav-item"}>
            <Link className="nav-link" to="/form">
              <i><CheckBoxIcon /></i>
              <p>Voter Registeration</p>
            </Link>
          </li>
          <li className={(window.location.pathname === "/dashboard")?"nav-item active":"nav-item"}>
            <Link className="nav-link" to="/dashboard">
              <i><HowToVoteIcon /></i>
              <p>Voting-Area</p>
            </Link>
          </li>
          <li className={(window.location.pathname === "/result")?"nav-item active":"nav-item"}>
            <Link className="nav-link" to="/result">
              <i><AssessmentIcon /></i>
              <p>Result</p>
            </Link>
          </li>
          <li className={(window.location.pathname === "/logout")?"nav-item active":"nav-item"}>
            <Link className="nav-link" onClick={logout}>
              <i><LogoutIcon /></i>
              <p >LogOut</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;