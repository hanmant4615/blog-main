import React from "react";
import { Link } from "react-router-dom";
import "./App.css";
import back1 from "./Img/Blog_Post.jpg";

function App() {
  return (
    <div className="bg-dark">
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary mb-5"
        data-bs-theme="dark"
        width="100%"
      >
        <div className="container-fluid">
          <Link className="navbar-brand">Blogger</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                ></Link>
              </li>
            </ul>

            <button
              className="btn btn-outline-primary"
              style={{ marginRight: 10 }}
            >
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Login
              </Link>
            </button>
            <button className="btn btn-outline-primary">
              <Link
                to="/signin"
                style={{ textDecoration: "none", color: "white" }}
              >
                Sign in
              </Link>
            </button>
          </div>
        </div>
      </nav>

      <div className="resdiv bg-dark" style={{ paddingBottom: 100 }}>
        <img
          src={back1}
          alt="i_mag"
          style={{ width: "50%", height: 600 }}
        ></img>
      </div>
    </div>
  );
}

export default App;
