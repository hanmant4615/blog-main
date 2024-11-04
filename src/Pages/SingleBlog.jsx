import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createURL } from "../config";
import edit from "../Img/edit-solid.svg";
const SingleBlog = (props) => {
  const navigate = useNavigate();
  const [blogid, setBlogid] = useState();

  const deleteblog = () => {
    console.log(`blogID = ${blogid}`);

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
          toast.success("deleted blog ");
          deleteblog();
          navigate("/myblog");
        }
      })
      .catch(() => {
        toast.error("error occur");
      });
  };

  const passid = () => {
    console.log(blogid);
    navigate("/editblog", { state: { blogid } });
  };

  useEffect(() => {
    setBlogid(props.id);
  }, []);

  return (
    <div className="row">
      <div className="col"></div>
      <div className="col">
        <div
          className="card  mb-3 mt-5"
          style={{ border: "3px solid black", borderRadius: 10 }}
        >
          <div className="card-header text-center bg-dark">
            <h2 style={{ padding: 10, color: "white" }}>
              {props.title}
              <img
                src={edit}
                className="float-right"
                alt="edit"
                onClick={passid}
                style={{
                  height: 50,
                  width: 50,
                  filter: "invert(100%)",
                  marginLeft: "200px",
                  border: "2px solid black",
                  paddingBottom: "8px",
                  paddingLeft: "12px",
                  paddingTop: 5,
                  paddingRight: "8px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              />
            </h2>
          </div>
          <div
            className="card-body"
            style={{
              padding: "20px",
              fontSize: "18px",
              backgroundColor: "#EBC7E6",
            }}
          >
            <h5
              className="card-title"
              id="contentText"
              style={{ padding: "5px 25px" }}
            >
              {props.content}
            </h5>
            <p style={{ textAlign: "right" }}> - {props.author}</p>
            <div className="card-text mt-4 text-center">
              <div>
                <button
                  className="rounded-pill bg-dark"
                  style={{
                    marginLeft: 30,
                    padding: "10px",
                    border: "2px solid black",
                    color: "white",
                  }}
                >
                  Like
                </button>

                <button
                  className="rounded-pill bg-dark"
                  style={{
                    padding: "10px",
                    border: "2px solid black",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Share
                </button>

                <button
                  onClick={deleteblog}
                  className="rounded-pill bg-dark"
                  style={{
                    padding: "10px",
                    border: "2px solid black",
                    color: "white",
                    marginLeft: 10,
                  }}
                >
                  Delete
                </button>

                {/* to see the id  */}

                <button style={{ background: "transparent", border: "none" }}>
                  <Link
                    to={props.src}
                    className="rounded-pill bg-dark"
                    style={{
                      padding: "10px",
                      border: "2px solid black",
                      color: "white",
                      textDecoration: "none",
                    }}
                  >
                    More
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col"></div>
    </div>
  );
};

export default SingleBlog;
