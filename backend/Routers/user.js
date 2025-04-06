const express = require("express");
const db = require("../db"); // mysql connection
const cryptoJs = require("crypto-js");
const utils = require("../utils");
const config = require("../config");
const jwt = require("jsonwebtoken");

// file upload
const multer = require("multer");
const upload = multer({ dest: "images" });

const router = express.Router();

router.post("/signin", (request, response) => {
  console.log("user/signin route");
  const { firstName, lastName, email, phone, password } = request.body;

  //encrypt the data by cryptojs
  const encryptedPassword = String(cryptoJs.SHA1(password));

  const query = `insert into user (firstName, lastName, email, password, phone) values (?, ?, ?, ?, ?)`;
  db.query(
    query,
    [firstName, lastName, email, encryptedPassword, phone],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

router.post("/signup", (request, response) => {
  // console.log('user/signiup Route ')
  const { email, password } = request.body;

  //encrypted password
  const encryptedPassword = String(cryptoJs.SHA1(password));

  const query = `select id ,firstName ,lastName from user where email = ? and password = ?`;

  db.query(query, [email, encryptedPassword], (error, user) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else if (user.length == 0) {
      response.send(utils.createErrorResult("User does not exit"));
    } else {
      // success then extract the information from the user
      // const {firstName , lastName , id} = user
      const { firstName, lastName, id } = user[0];

      // create a  jwt token

      const token = jwt.sign(
        {
          id,
          firstName,
          lastName,
        },
        config.key
      );

      response.send(
        utils.createSuccessResult({
          firstName,
          lastName,
          token,
        })
      );
    }
  });
});

router.get("/profile", (request, response) => {
  const id = request.user.id;
  const query = `select firstName, lastName, email, phone , ProfileImage from user where id = ?`;
  db.query(query, [id], (error, users) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else if (users.length == 0) {
      response.send(utils.createErrorResult("user does not exist"));
    } else {
      response.send(utils.createSuccessResult(users[0]));
    }
  });
});

router.post(
  "/upload-profile-image",
  upload.single("image"), // please use image as key while uploading a file
  (request, response) => {
    // get the uploaded file's file name
    const filename = request.file.filename;
    console.log(filename);

    if (!filename || filename.length == 0) {
      response.send("your image uploading did not work, please try again");
    } else {
      const query = `update user set profileImage = ? where id = ?`;
      db.query(query, [filename, request.user.id], (error, result) => {
        response.send(utils.createResult(error, result));
      });
    }
  }
);

router.get("/profile-image", (request, response) => {
  const query = `select profileImage from user where id = ?`;
  db.query(query, [request.user.id], (error, result) => {
    if (error) {
      response.send(utils.createErrorResult(error));
    } else if (result.length == 0) {
      response.send(
        utils.createErrorResult("error while sending your profile")
      );
    } else {
      const { profileImage } = result[0];
      // const file = fs.readFileSync("images/" + profileImage);
      response.send(utils.createSuccessResult({ profileImage }));
    }
  });
});

router.patch("/updatefirstname", (req, res) => {
  const { firstName } = req.body;
  const query = "update user set firstName = ? where id =?";
  db.query(query, [firstName, req.user.id], (error, result) => {
    res.send(utils.createResult(error, result));
  });
});

router.patch("/updatelastname", (req, res) => {
  const { lastName } = req.body;
  const query = "update user set lastName = ? where id =?";
  db.query(query, [lastName, req.user.id], (error, result) => {
    res.send(utils.createResult(error, result));
  });
});

router.patch("/updateemail", (req, res) => {
  const { email } = req.body;
  const query = "update user set email = ? where id =?";
  db.query(query, [email, req.user.id], (error, result) => {
    res.send(utils.createResult(error, result));
  });
});

router.patch("/updatephone", (req, res) => {
  const { phone } = req.body;
  const query = "update user set phone = ? where id =?";
  db.query(query, [phone, req.user.id], (error, result) => {
    res.send(utils.createResult(error, result));
  });
});

// change password
router.patch("/changepassword", (req, res) => {
  const { oldpassword, password } = req.body;

  const encryptedPassword = String(cryptoJs.SHA1(oldpassword));

  const registeredpasswordquery =
    "select count (*) as count from user where id = ? and password = ? ";

  db.query(
    registeredpasswordquery,
    [req.user.id, encryptedPassword],
    (error, result) => {
      // console.log(`server side response = ${utils.createResult(error,result)}`)

      if (error) {
        res.send(utils.createErrorResult(error));
      }
      //  else if (result.length == 0) {  res.send(utils.createErrorResult("invalid result"));}
      else {
        const info = result[0];
        if (info["count"] == 0) {
          res.send(utils.createErrorResult("old password is not match"));
        } else {
          console.log("New pasword" + password);
          const newpassencry = String(cryptoJs.SHA1(password));
          const query = `update user set password = ? where id = ?`;
          db.query(query, [newpassencry, req.user.id], (error, result) => {
            res.send(utils.createResult(error, result));
          });
        }
      }
    }
  );
});

// delete user
router.delete("/delete", (req, res) => {
  const query = "delete from user where id =?";
  db.query(query, [req.user.id], (error, result) => {
    res.send(utils.createResult(error, result));
  });
});

module.exports = router;
