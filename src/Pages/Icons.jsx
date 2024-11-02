import React from "react";
import "./Icons";

function Icons() {
  return (
    <div className="wrapper">
      <div className="button">
        <div className="icon">
          <i className="far fa-thumbs-up"></i>
        </div>
        <span>Like</span>
      </div>
      <div className="button">
        <div className="icon">
          <i className="fas fa-share"></i>
        </div>
        <span>Share</span>
      </div>
      <div className="button">
        <div className="icon">
          <i className="fas fa-trash"></i>
        </div>
        <span>Delete</span>
      </div>

      <div className="button">
        <div className="icon">
          <i className="fas fa-edit"></i>
        </div>
        <span>Edit</span>
      </div>
    </div>
  );
}

export default Icons;
