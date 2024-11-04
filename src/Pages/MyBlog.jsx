import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createURL } from "../config";
import Navbar from "./Navbar";

const MyBlog = () => {
  const [myblog, setmyblog] = useState("");
  const navigate = useNavigate("");

  const loadmyblogs = () => {
    const url = createURL("blog");
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
          }
        }
      });
  };

  useEffect(() => {
    loadmyblogs();
  }, []);

  const deleteblog = (blogid) => {
    const url = createURL("blog/" + blogid);

    const token = sessionStorage["token"];
    axios
      .delete(url, {
        headers: {
          "x-token": token,
        },
      })
      .then((res) => {
        const result = res.data;
        if (result["status"] === "success") {
          navigate("/myblog");
          toast.success("deleted blog");
        }
      })
      .catch(() => {
        toast.error("error occur");
      });
  };

  return (
    <div>
      <Navbar />
      {myblog &&
        myblog.map((value, index) => {
          const { title, details, id } = myblog[index];

          return (
            <div key={index} className="resdiv">
              <div className="container1">
                <div className="card1">
                  <div className="content1">
                    <h2> id </h2>
                    <h3>{title}</h3>
                    <p style={{ fontWeight: "500" }}> {details} </p>
                    <Link id="like" style={{ marginRight: 10 }} to="">
                      Like <i className="fas fa-thumbs-up"></i>
                    </Link>

                    <Link id="share" style={{ marginRight: 10 }} to="">
                      Share <i className="fas fa-share"></i>{" "}
                    </Link>

                    <Link
                      id="delete"
                      style={{ marginRight: 10 }}
                      onClick={() => deleteblog(id)}
                    >
                      Delete <i className="fas fa-trash"></i>
                    </Link>

                    <Link
                      to={`/myblog/editblog/${id}`}
                      id="edit"
                      style={{ marginRight: 8 }}
                    >
                      Edit <i className="fas fa-edit"></i>
                    </Link>
                    <Link id="more" to="">
                      More <i className="fas fa-angle-double-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MyBlog;
