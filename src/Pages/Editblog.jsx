import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "./Navbar";
import { createURL } from "../config";

const Editblog = () => {
  const id = useParams("");

  const [details, setdetails] = useState("");
  const [oldtitle, setoldtitle] = useState("");

  const [title, settitle] = useState("");

  const navigate = useNavigate();

  const [myblog, setmyblog] = useState("");

  const loadmyblogs = () => {
    const url = createURL(`blog/${id.id}`);
    console.log(url);
    axios
      .get(url, {
        headers: {
          "x-token": sessionStorage["token"],
        },
      })
      .then((response) => {
        const result = response.data;
        if (result["status"] === "error") {
          toast.error("Error while fetching blog");
        } else {
          const result = response.data;
          if (result["data"].length === 0) {
            toast.error("Empty");
          } else {
            setmyblog(result["data"]);
            const { title, details } = myblog[0];
          }
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  useEffect(() => {
    loadmyblogs();
  }, []);

  const New = () => {
    settitle("");
    setdetails("");
  };

  const olddata = () => {
    console.log(`blogID = ${id.id}`);
    console.log(myblog[0].title + " " + myblog[0].details);
    settitle(myblog[0].title);
    setdetails(myblog[0].details);
  };

  const save = () => {
    //get data

    const url = createURL(`blog/${id.id}`);

    if (title.length === 0) {
      toast.error("Title cannot be Empty");
    } else if (details.length === 0) {
      toast.error("Details of blog cannot be empty");
    } else {
      const token = sessionStorage["token"];

      axios
        .put(
          url,
          { title, details },
          {
            headers: {
              "x-token": token,
            },
          }
        )
        .then((res) => {
          const result = res.data;
          if (result["status"] === "success") {
            toast.success("updated blog");
            navigate("/myblog");
          }
        })
        .catch((error) => {
          toast.error("error occur");
        });
    }
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
              col="10"
              style={{ resize: "none", background: "transparent" }}
              onChange={(e) => {
                settitle(e.target.value);
              }}
              type="text"
              className="form-control  logininput "
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-lg"
              value={title}
            />
          </div>

          {/* <input type="text" className='mt-3' onChange={e => setcontent(e.target.value)} style={{ width: '90%', height: '350px', borderRadius: '10px' }}>
  
        </input> */}

          <div className="input-group">
            <textarea
              value={details}
              onChange={(e) => setdetails(e.target.value)}
              style={{ resize: "none", height: 300, width: "fit-content" }}
              col="30"
              className="form-control logininput mt-3"
              aria-label="With textarea"
            ></textarea>
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={olddata}
          style={{ marginRight: 10 }}
        >
          Get old data and edit{" "}
        </button>
        <button
          className="btn btn-primary"
          onClick={New}
          style={{ marginRight: 10 }}
        >
          add new details
        </button>

        <button
          className="btn btn-success"
          onClick={save}
          style={{ marginRight: 10 }}
        >
          save
        </button>

        <Link className="btn btn-danger" to="/blogs">
          Cancel
        </Link>
      </div>
    </>
  );
};

export default Editblog;
