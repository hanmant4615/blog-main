import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import Blog from "./Pages/Blog";
import Addblog from "./Pages/Addblog";
import Profile from "./Pages/Profile";
import MyBlog from "./Pages/MyBlog";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Editblog from "./Pages/Editblog";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/blogs" element={<Blog />}></Route>
        <Route path="/addblog" element={<Addblog />}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path="/myblog" element={<MyBlog />}></Route>
        {/* <Route path='/blogs/edit-blog/:id' element={<Editblog/>}></Route> */}
        <Route path="/myblog/editblog/:id" element={<Editblog />}></Route>
      </Routes>

      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
