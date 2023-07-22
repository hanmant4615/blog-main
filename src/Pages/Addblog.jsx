import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createURL } from "../config";
import Navbar from "./Navbar";

function Addblog() {
  const [details, setdetails] = useState("");
  const [title, settitle] = useState("");
  const navigate = useNavigate();
  const save = () => {
    if (title.length === 0) {
      toast.error("Enter the title of the blog ");
    } else if (details.length === 0) {
      toast.error("Enter the content of the blog ");
    } else {
      const url = createURL("blog/");
      axios
        .post(
          url,
          {
            title,
            details,
          },
          {
            headers: {
              "x-token": sessionStorage["token"],
            },
          }
        )
        .then((response) => {
          const result = response.data;
          if (result["status"] === "success") {
            toast.success("Blog created successfully");
            navigate("/myblog");
          } else {
            toast.error("Error while creating blog");
          }
        });
    }
  };
  const cancel = () => {
    navigate("/blogs");
  };

  return (
    <>
      <Navbar />

      <div className="resdiv text-center">
        <div style={{ width: "95%", margin: "5px 50px" }}>
          <div className="input-group input-group-lg mt-5">
            <span
              className="input-group-text logininput "
              id="inputGroup-sizing-lg"
            >
              <div className="mt-3">Title of the blog</div>
            </span>

            <textarea
              id="titleinput"
              col="10"
              style={{ resize: "none", background: "transparent" }}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              type="text"
              className="form-control  logininput "
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
            />
          </div>

          {/* <input type="text" className='mt-3' onChange={e => setcontent(e.target.value)} style={{ width: '90%', height: '350px', borderRadius: '10px' }}>

          </input> */}

          <div className="input-group mt-3">
            <textarea
              id="textareainput"
              onChange={(e) => setdetails(e.target.value)}
              style={{ resize: "none", height: 300, width: "fit-content" }}
              col="30"
              className="form-control logininput "
              aria-label="With textarea"
            ></textarea>
          </div>
          {/* <div className="logininput" style={{ marginTop: "15px" }}>
            <button className="btn">Cancel</button>
            <button className="btn">Cancel</button>{" "}
          </div> */}
          <div className="text-center mt-3">
            <button
              className="btn btn-success"
              onClick={save}
              style={{ marginRight: 10 }}
            >
              Save
            </button>
            <button className="btn" id="cancelbtn" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addblog;
