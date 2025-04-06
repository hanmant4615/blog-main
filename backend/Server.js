const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const jwt = require("jsonwebtoken");
const utils = require("./utils");

// create express app
const app = express();
app.use(cors("*"));
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static('images'))

app.use((request, response, next) => {
    // since both signup and signin will never have the token
    // simply skip checking the token for them
    if (request.url == "/user/signup" || request.url == "/user/signin") {
      // pass to the next function (to go the next route)
      next();
    } else {
      // get the token
      const token = request.headers["x-token"];
      if (!token) {
        response.send(utils.createErrorResult("token missing"));
      } else {
        try {
          // verify and decode the token to get the user's id
          const user = jwt.verify(token, config.key);
  
          // add the logged in user's information in the request
          // which will be passed to all the APIs
          request.user = user;
          next();
        } catch (ex) {
          console.log(ex);
          response.send(utils.createErrorResult(ex));
        }
      }
    }
  });

const userRouter = require("./Routers/user");
const blogitemsRoter = require('./Routers/blog')

// custom route
app.use('/user',userRouter)
app.use('/blog',blogitemsRoter)

app.listen(5000,'0.0.0.0',()=>{
    console.log("Server started on port 5000")
})