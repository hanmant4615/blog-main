import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css";
import { createURL } from "../config";
import moment from "moment/moment";

function Navbar() {
  const [items, setItems] = useState();
const [mode,setMode] = useState(false)
  const [profiledata, setprofiledata] = useState("");
 
  const loadProfilephoto = () => {
    const url = createURL("user/profile-image");

    const token = sessionStorage["token"];
    if (!token) {
      navigate("/");
      return;
    }
    axios
      .get(url, {
        headers: {
          "x-token": token,
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["status"] === "success") {
          const data = result["data"];
          const dataofimg = data.profileImage;

          if (dataofimg === null) {
            document.getElementById("navphoto").style.display = "none";
            document.getElementById("navphoto").style.marginRight = "-50px";
            // document.getElementById('editicon').style.height = '50px'
            // document.getElementById('editicon').style.width = '50px'
            // document.getElementById('editprofile').style.borderStyle = 'none'
          }
          setItems(data);
        } else {
          toast.error("error while loading your Profile");
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(`error: `, error);
      });
  };

  const getprofiledata = () => {
    const url = createURL("user/profile");
    axios
      .get(url, {
        headers: {
          "x-token": sessionStorage["token"],
        },
      })
      .then((res) => {
        const result = res.data;
        setprofiledata(result["data"]);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    getprofiledata();
    loadProfilephoto();
  }, []);

  const navigate = useNavigate();

  function logout() {
    // sessionStorage.removeItem["firstName"];
    // sessionStorage.removeItem["lastName"];
    // sessionStorage.removeItem["token"];
  
    sessionStorage.removeItem("firstName");
    sessionStorage.removeItem("lastName");
    sessionStorage.removeItem("token");
    navigate("/");
  }

  return (
    <nav
      className="navbar   navbar-expand-lg bg-body-tertiary"
      style={{ color: "white", width: "100%" }}
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" style={{ color: "white" }}>
          {" "}
          Blogger{" "}
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
          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/blogs">
                Blogs
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/myblog"
              >
                Myblog
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/Profile"
                style={{ color: "white" }}
              >
                Profile
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/addblog"
              >
                Add blog
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              {/*  first name  */}
              {/* <Link className="nav-link active" style={{marginRight:10}} aria-current="page" to=""> Welcome , {profiledata.firstName}</Link> */}
            </li>
          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <button className="btn btn-outline-primary" onClick={()=>{
                setMode(!mode)
                document.body.style.backgroundColor = mode === false ?"#ffffff" : '#1F1B24'
                document.getElementById('titleinput').style.backgroundColor =  mode === false ?"#ffffff" : '#1F1B24'
                document.getElementById('titleinput').style.color =  mode === true ?"#ffffff" : '#1F1B24'
                document.getElementById('textareainput').style.backgroundColor =  mode === false ?"#ffffff" : '#1F1B24'
                document.getElementsByClassName('card1').style.backgroundColor =  mode === true ?"#ffffff" : '#1F1B24'
                document.getElementById('Card_content').style.color = 'red'
              }}>Dark mode</button>
            </li>
          </ul>
          <ul className="navbar-nav  mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="">
                {moment().format('LT')}
              </Link>
            </li>
          </ul>
         
          <ul
            className="navbar-nav mb-lg-0"
            id="navphoto"
            style={{
              marginRight: 20,
              height: "50px",
              width: "50px",
              borderRadius: "50%",
            }}
          >
            {/* <button id='editprofile' data-bs-toggle="collapse" href="#upload"  aria-expanded="false" aria-controls="collapseExample"  style={{ borderStyle: 'none', position: 'relative', border: '2px solid white',  borderRadius: "50%", padding: 10 }}>
                  <img id="editicon" src={edit} style={{ height: '30px', width: '30px' }} alt='editProfile'></img>
                </button> */}

            {items && (
              <img
                src={"http://localhost:5000/" + items.profileImage}
                alt="profile img"
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  border: "2px solid white",
                }}
              />
            )}
          </ul>

          <button className="btn btn-outline-primary" onClick={logout}>
            {" "}
            Log out{" "}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
