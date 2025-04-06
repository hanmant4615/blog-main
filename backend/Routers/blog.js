const express = require('express');
const db = require('../db');
const utils = require('../utils')


const router = express.Router()

router.post("/", (request, response) => {
    const { title, details } = request.body;
  
    const query = `insert into blogItems (title, details, userId) values (?, ?, ?)`;
    db.query(query, [title, details, request.user.id], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });


  router.get("/", (request, response) => {
    const query = `select id, title, details, status from blogItems where userId = ?`;
    db.query(query, [request.user.id], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });

  router.get("/all", (request, response) => {
    const query = `select id, title, details, status from blogItems`;
    db.query(query, [], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  });


  // update blog 
  router.put("/:id", (request, response) => {
    const { title, details } = request.body;
    const { id } = request.params;
  
    // check if this blog belongs to the logged in user
    const checkOwnerQuery = `select count (*) as count from blogItems where id = ? and userId = ?`;
    db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else if (result.length == 0) {
        response.send(utils.createErrorResult("invalid result"));
      } else {
        const info = result[0];
        if (info["count"] == 0) {
          response.send(utils.createErrorResult("this blog  does not belong to you")
          );
        } else {
          const query = `update blogItems set title = ? , details = ? where id = ?`;
          db.query(query, [title, details, id], (error, result) => {
            response.send(utils.createResult(error, result));
          });
        }
      }
    });
  });

  // delete blog
  router.delete("/:id", (request, response) => {
    const { id } = request.params;
  
    // check if this todoItem belongs to the logged in user
    const checkOwnerQuery = `select count (*) as count from blogItems where id = ? and userId = ?`;
    db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
      if (error) {
        response.send(utils.createErrorResult(error));
      } else if (result.length == 0) {
        response.send(utils.createErrorResult("invalid result"));
      } else {
        const info = result[0];
        if (info["count"] == 0) {
          response.send(
            utils.createErrorResult("this blog  does not belong to you")
          );
        } else {
          const query = `delete from blogitems where id = ?`;
          db.query(query, [id], (error, result) => {
            response.send(utils.createResult(error, result));
          });
        }
      }
    });
  });


// get single blog

router.get("/:id", (request, response) => {
  const { id } = request.params;

  const query = `select title, details from blogItems where userId = ? and id = ? `;
  db.query(query, [request.user.id,id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});






  // to see the owner ship of the blog 
  // patch : for  the recieve id to excute query 
  
 
  // router.patch('/update-status/:id',(request ,response)=>{
  //   const {status} = request.body;
  //   const {id} = request.params;
  //   const checkOwnerQuery = `select count (*) as count from blogItems where id = ? and userId = ?`;
  //   db.query(checkOwnerQuery, [id, request.user.id], (error, result) => {
  //     if (error) {
  //       response.send(utils.createErrorResult(error));
  //     } else if (result.length == 0) {
  //       response.send(utils.createErrorResult("invalid result"));
  //     } else {
  //       const info = result[0];
  //       if (info["count"] == 0) {
  //         response.send(
  //           utils.createErrorResult("this todo item does not belong to you")
  //         );
  //       } else {
  //         const query = `update blogitems set status = ? where id = ?`;
  //       db.query(query, [status == false ? 0 : 1, id], (error, result) => {
  //         response.send(utils.createResult(error, result));
  //       });
  //       }
  //     }
  //   });



  // })





module.exports = router