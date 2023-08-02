import React, { useState } from "react";
import classes from "./navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import womenImg from "../../assets/woman.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = () => {
    dispatch(logout())
    navigate("/login")
    
  }
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <Link to="/">Ecstacy</Link>
        </div>
        <ul className={classes.center}>
          <li className={classes.listItem}>Home</li>
          <li className={classes.listItem}>About</li>
          <li className={classes.listItem}>Contacts</li>
          <li className={classes.listItem}>Categories</li>
        </ul>
        <div className={classes.right}>
          <img
            onClick={() => setShowModal((prev) => !prev)}
            src={womenImg}
            className={classes.img}
          />
          {showModal && (
            <div className={classes.modal}>
              <Link to="/create">Create</Link>
              <span onClick={handleSubmit}>Logout</span>
            </div>
          )}
          {!user ? (
            <>{/* Condition when user is not logged in */}</>
          ) : (
            <>
              <span>Hello {user.username}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
