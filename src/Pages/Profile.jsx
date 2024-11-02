import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "./Navbar";
import { createURL } from "../config";
import axios from "axios";
import { toast } from "react-toastify";
import tick from "../Img/verify3.png";
import { useNavigate } from "react-router-dom";
import edit from "../Img/edit.png";

const Profile = () => {
  const navigate = useNavigate();
  const [profiledata, setprofiledata] = useState("");
  const [firstName, setfirstname] = useState("");
  const [lastName, setlastname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [oldpassword, setoldpassword] = useState("");
  const [password, setpassword] = useState("");
  //image realated data
  const [image, setImage] = useState("");
  const [items, setItems] = useState();

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
            document.getElementById("default").style.display = "none";
            document.getElementById("editicon").style.height = "150px";
            document.getElementById("editicon").style.width = "150px";
            document.getElementById("editprofile").style.top = "10px";
            document.getElementById("editprofile").style.borderStyle = "none";
            document.getElementById("editprofile").style.marginBottom = "20px";
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

  useEffect(() => {
    loadProfilephoto();
  }, []);

  const onUpload = () => {
    const formData = new FormData();
    formData.append("image", image);

    const url = createURL("user/upload-profile-image");

    axios
      .post(url, formData, {
        headers: {
          "x-token": sessionStorage["token"],
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["status"] === "success") {
          toast.success("Profile added successfully");
          loadProfilephoto();
        } else {
          toast.error("Something went wrong");
        }
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
        if (result["status"] === "success") {
          setprofiledata(result["data"]);
          navigate("/profile");
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const editFirstname = () => {
    const token = sessionStorage["token"];
    const url = createURL("user/updatefirstname");
    if (firstName.length === 0) {
      toast.error("Firstname must be fill");
    } else {
      axios
        .patch(
          url,
          { firstName },
          {
            headers: {
              "x-token": token,
            },
          }
        )
        .then((res) => {
          const result = res.data;
          if (result["data"].length === 0) {
            toast.error("invalid result");
          } else if (result["status"] === "success") {
            toast.success("Firstname updated successfully");
          } else {
            toast.error("Error");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const editLastname = () => {
    const token = sessionStorage["token"];
    const url = createURL("user/updatelastname");
    if (lastName.length === 0) {
      toast.error("LastName must be fill");
    } else {
      axios
        .patch(
          url,
          { lastName },
          {
            headers: {
              "x-token": token,
            },
          }
        )
        .then((res) => {
          const result = res.data;
          if (result["data"].length === 0) {
            toast.error("lastname cannot be empty");
          } else if (result["status"] === "success") {
            toast.success("lastname updated successfully");
            window.location.reload(false);
          } else {
            toast.error("Error");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const editEmail = () => {
    const token = sessionStorage["token"];
    const url = createURL("user/updateemail");
    if (email.length === 0) {
      toast.error("Email cannot be empty");
    } else {
      axios
        .patch(
          url,
          { email },
          {
            headers: {
              "x-token": token,
            },
          }
        )
        .then((res) => {
          const result = res.data;
          if (result["status"] === "success") {
            toast.success("email updated successfully");
            window.location.reload(false);
          } else if (result["error"] === "User already Exist") {
            toast.error("Email already Exist");
          } else {
            toast.error("Error");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const editPhone = () => {
    const token = sessionStorage["token"];
    const url = createURL("user/updatephone");
    if (phone.length === 0) {
      toast.error("phone cannot be empty");
    } else {
      axios
        .patch(
          url,
          { phone },
          {
            headers: {
              "x-token": token,
            },
          }
        )
        .then((res) => {
          const result = res.data;
          if (result["status"] === "success") {
            toast.success("Phone number updated successfully");
            window.location.reload(false);
          } else {
            toast.error("Error");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const changepassword = () => {
    if (oldpassword.length === 0) {
      toast.error("Enter the old password");
    } else if (password.length === 0) {
      toast.error("Enter the new password");
    } else {
      const url = createURL("user/changepassword");
      console.log(`oldpassword = ${oldpassword} , password = ${password}`);
      axios
        .patch(
          url,
          { oldpassword, password },
          { headers: { "x-token": sessionStorage["token"] } }
        )
        .then((res) => {
          const result = res.data;
          console.log(result["error"]);
          if (result["status"] === "success") {
            toast.success("Password change successfully");
          } else {
            toast.error("error");
          }
        });
    }
  };

  useEffect(() => {
    getprofiledata();
  }, []);

  function deleteuser() {
    const url = createURL("user/delete");

    axios
      .delete(url, {
        headers: { "x-token": sessionStorage["token"] },
      })
      .then((res) => {
        const result = res.data;
        if (result["status"] === "success") {
          toast.success("delete user successfully");
          navigate("/");
        } else {
          toast.error("error");
        }
      })
      .catch((error) => {
        toast.error("error");
      });
  }

  // Update profile image
  const updateimage = () => {
    const url = createURL("user/upload-profile-image");
    const token = sessionStorage["token"];

    axios
      .post(url, { image }, { headers: { "x-token": token } })
      .then((res) => {
        console.log("image = " + image);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <>
      <Navbar />

      <div className="resdiv">
        <div className="collapse  borderdiv" id="upload">
          <div className="mb-3">
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            />
          </div>

          <div
            className="mt-2"
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={onUpload}
              type="submit"
              id="profilesavebtn"
              style={{ marginRight: 20 }}
            >
              Confirm
            </button>
            <button
              data-bs-toggle="collapse"
              href="#upload"
              aria-expanded="false"
              aria-controls="collapseExample"
              style={{ color: "white" }}
              type="submit"
              id="cancelbtn"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="resdiv">
        <div
          id="profilediv"
          className="mt-3"
          style={{ borderRadius: "20px", padding: "15px 15px" }}
        >
          <div className="resdiv">
            <span
              id="default"
              style={{ height: "250px", width: "250px", borderRadius: "50%" }}
            >
              {items && (
                <img
                  src={"http://localhost:5000/" + items.profileImage}
                  alt="profile img"
                  style={{
                    marginLeft: 10,
                    height: "250px",
                    width: "250px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </span>
            <span>
              <button
                id="editprofile"
                data-bs-toggle="collapse"
                href="#upload"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={updateimage}
                style={{
                  borderStyle: "none",
                  position: "relative",
                  border: "2px solid white",
                  top: "-70px",
                  borderRadius: "50%",
                  padding: 10,
                }}
              >
                <img
                  id="editicon"
                  src={edit}
                  style={{ height: "40px", width: "40px" }}
                  alt="editProfile"
                ></img>
              </button>
            </span>
          </div>

          {/* image  */}

          {/* Firstname  */}
          <div className="resdiv">
            <label htmlFor="inputEmail4" className="form-label mt-2 ">
              First name
            </label>
            <input
              type="text"
              placeholder={profiledata.firstName}
              onChange={(e) => setfirstname(e.target.value)}
              style={{ margin: "0px 15px", width: "fit-content" }}
              className="form-control"
              id="inputEmail4"
            />
            <button
              onClick={editFirstname}
              style={{
                background: "transparent",
                borderStyle: "none",
              }}
            >
              <img
                src={tick}
                style={{ background: "transparent", borderStyle: "none" }}
                height="fit-content"
                width="fit-content"
                alt="first_name_update"
              ></img>
            </button>
            <div></div>
          </div>

          {/* lastname  */}
          <div className="mt-4 resdiv">
            <label htmlFor="inputPassword4" className="form-label mt-2">
              Last Name
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => setlastname(e.target.value)}
              style={{ margin: "0px 15px", width: "fit-content" }}
              placeholder={profiledata.lastName}
              id="inputPassword4"
            />
            <button
              onClick={editLastname}
              style={{
                background: "transparent",
                borderStyle: "none",
              }}
            >
              <img
                src={tick}
                style={{ background: "transparent" }}
                height="fit-content"
                width="fit-content"
                alt="lastname"
              ></img>
            </button>
          </div>

          {/* phone  */}
          <div className="mt-4">
            <label htmlFor="inputEmail4" className="form-label mt-2">
              Phone No
            </label>
            <input
              type="tel"
              onChange={(e) => setphone(e.target.value)}
              style={{ margin: "0px 15px", width: "fit-content" }}
              placeholder={profiledata.phone}
              className="form-control"
              id="inputEmail4"
            />
            <button
              onClick={editPhone}
              style={{ background: "transparent", borderStyle: "none" }}
            >
              <img
                src={tick}
                style={{ background: "transparent", marginLeft: 10 }}
                height="fit-content"
                width="fit-content"
                alt="image_photo"
              ></img>
            </button>
          </div>

          <div className="mt-4 resdiv">
            <label htmlFor="inputPassword4" className="form-label mt-2">
              Email
            </label>
            <input
              type="email"
              onChange={(e) => setemail(e.target.value)}
              style={{ margin: "0px 15px", width: "95%" }}
              className="form-control"
              placeholder={profiledata.email}
              id="inputPassword4"
            />
            <button style={{ background: "transparent", borderStyle: "none" }}>
              <img
                onClick={editEmail}
                src={tick}
                style={{ background: "transparent", marginLeft: 10 }}
                height="fit-content"
                width="fit-content"
                alt="image_photo"
              ></img>
            </button>
          </div>

          <div className="resdiv mt-2">
            <button
              className="btneffect"
              data-bs-toggle="collapse"
              href="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
              style={{
                padding: "15px",
                backgroundColor: "#9e72bd",
                color: "white",
              }}
            >
              Change Password
            </button>
          </div>

          {/* change password */}

          <div className="collapse  borderdiv" id="collapseExample">
            <div style={{ width: "fit-content", margin: 0 }}>
              <label htmlFor="inputEmail4" className="form-label mt-2">
                Old Password
              </label>
              <input
                type="tel"
                style={{ marginTop: "5px", width: "fit-content" }}
                placeholder="Enter the old password"
                className="form-control"
                id="inputEmail4"
                onChange={(e) => setoldpassword(e.target.value)}
              />
            </div>
            <div style={{ width: "fit-content" }}>
              <label htmlFor="inputEmail4" className="form-label mt-2">
                New password
              </label>
              <input
                type="tel"
                style={{ marginTop: "5px", width: "fit-content" }}
                placeholder="Enter the new password"
                className="form-control"
                id="inputEmail4"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            {/* button  */}
            <div
              className="mt-2"
              style={{
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <button
                onClick={changepassword}
                type="submit"
                id="profilesavebtn"
                style={{ marginRight: 20 }}
              >
                Save
              </button>
              <button
                data-bs-toggle="collapse"
                href="#collapseExample"
                // role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
                style={{ color: "white" }}
                type="submit"
                id="cancelbtn"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Delete  */}

          <div className="resdiv mt-2">
            <button
              onClick={deleteuser}
              className="btneffect"
              style={{
                padding: "15px",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
