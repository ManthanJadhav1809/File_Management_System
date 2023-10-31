import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SignOutUser } from "../../redux/ActionCreators/authActionCreators";

export default function NavbarDash() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch=useDispatch();

  return (
    <nav className="navbar shadow-sm p-3 navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand ms-5" to="/dashboard">
        File Management System
      </Link>
      <ul className="navbar-nav ms-auto me-5">
        {isAuthenticated ? (
          <>
            <li className="nav-item mx-2 ">
              <p className="my-0 mt-1 mx-2">
                <span className="text-light">Welcome,</span>
                <span className="text-warning fw-bold">{user.displayName}</span>
              </p>
            </li> 
            <li className="nav-item mx-2 ">
              <Link to="/" className="btn btn-primary btn-sm">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <button  className="btn btn-success btn-sm" onClick={()=>dispatch(SignOutUser())}>
                LogOut
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-item mx-2 ">
              <Link to="/login" className="btn btn-primary btn-sm">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="btn btn-success btn-sm">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
