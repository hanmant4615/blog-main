import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../Img/signin.png";
import "../App.css";
import { toast } from "react-toastify";
import { createURL } from "../config";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(false);
  const [firstName, setFirstName] = useState("user");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [confirmpassword, setconfirmpassword] = useState("");
  const [password, setpassword] = useState("");

  function onSignin() {
    // console.log("firstname =  "+typeof firstName + "lastname " + typeof(lastName) +"email  "+ typeof(email)+"password"+ typeof(password)+" phone"+ typeof(phone))
    if (firstName.length === 0) {
      toast.error("Firstname must be fill");
    } else if (lastName.length === 0) {
      toast.error("Last name must be fill");
    } else if (email.length === 0) {
      toast.error("Email must be fill");
    } else if (password.length === 0) {
      toast.error("Password name must be fill");
    } else if (phone.length === 0) {
      toast.error("Phone must be fill");
    } else if (confirmpassword !== password) {
      toast.error("Passwords does not match");
    } else {
      const url = createURL("user/signin");
      console.log(url);
      axios
        .post(url, { firstName, lastName, email, password, phone })
        .then((res) => {
          const result = res.data;
          console.log(result);
          if (result["status"] === "success") {
            toast.success("Data inserted");
            navigate("/login");
          } else if (result["error"] === "User already Exist") {
            toast.error("User already Exist");
          }
        })
        .catch((error) => {
          toast.error("error occur");
        });
    }
  }

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
        width="100%"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Blogger
          </Link>
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
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav  mb-2 mb-lg-0">
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    setMode(!mode);
                    document.body.style.backgroundColor =
                      mode === false ? "#ffffff" : "#1F1B24";
                  }}
                >
                  Dark mode
                </button>
              </li>
            </ul>

            <button className="btn btn-outline-primary">
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                Log in
              </Link>
            </button>
          </div>
        </div>
      </nav>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "30px",
        }}
      >
        <div
          id="sigindiv"
          style={{
            // background: '#4D455D',
            padding: " 0px 40px",
            borderRadius: "15px",
          }}
        >
          <div className="resdiv">
            <div className="mt-1 mb-2 icondiv" style={{ borderRadius: "50%" }}>
              <img
                src={icon}
                style={{
                  padding: "5px",
                  borderRadius: "50%",
                  background: "transparant",
                }}
                height="100px"
                alt="icon"
              ></img>
            </div>
          </div>

          <h5 className="mb-4 text-center">
            Please fill this form to create an account.
          </h5>

          <div className="form-floating mt-3">
            <input
              type="text"
              className=" signinput form-control mb-3  "
              placeholder="Enter the first name"
              onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <label htmlFor="title"> Enter the first name </label>
          </div>

          <div className="form-floating">
            <input
              type="text"
              className="signinput form-control mb-3  "
              placeholder="Enter the first name"
              onChange={(e) => setLastName(e.target.value)}
            ></input>
            <label htmlFor="title"> Enter the Last name </label>
          </div>

          <div className="form-floating">
            <input
              type="tel"
              className=" signinput form-control mb-3 "
              placeholder="Enter the first name"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            ></input>
            <label htmlFor="title"> Enter the Phone number </label>
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="signinput form-control mb-3 "
              placeholder="Enter the Email name"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
            <label htmlFor="title"> Enter the Email </label>
          </div>

          <div
            className="password"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <div className="col-md-6" style={{ marginRight: 10 }}>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control mb-3 signinput"
                  onChange={(e) => setpassword(e.target.value)}
                ></input>
                <label
                  className="text-center"
                  style={{ fontSize: 20, fontWeight: 550 }}
                  htmlFor="title"
                >
                  {" "}
                  Set the password{" "}
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control signinput"
                  onChange={(e) => setconfirmpassword(e.target.value)}
                ></input>
                <label
                  style={{ fontSize: 20, fontWeight: 550 }}
                  htmlFor="title"
                >
                  {" "}
                  Re-Enter password{" "}
                </label>
              </div>
            </div>
          </div>

          <div className="resdiv  mt-2 mb-3">
            <button
              onClick={onSignin}
              className="btn btn-primary"
              style={{ marginRight: 15 }}
            >
              Sign in
            </button>
            <Link to="/login" style={{ textDecoration: "none", fontSize: 18 }}>
              {" "}
              Already have a account{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
