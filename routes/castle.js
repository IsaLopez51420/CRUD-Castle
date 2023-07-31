var express = require("express");
const connection = require("../config/db");
const uploadImage = require("../middleware/multer");
var router = express.Router();

//RUTA BASE DE ESTE ARCHIVO: localhost:3000/castle

// localhost:3000/castle

router.get("/allUser/", (req, res) => {
    connection.query('SELECT * FROM warrior', (error, result) => {
        if (error) throw error;
        console.log(result);

        res.render("allUser", {result});
    });
   
});

// localhost:3000/castle/oneUser/:id

router.get("/oneUser/:id", (req, res) => {
   let id = req.params.id;

   let sql = `SELECT * FROM warrior WHERE warrior_id = ${id}`;

 connection.query(sql, (error, result) => {
     console.log(result);
        if(error) throw error;

      res.render("oneUser", {result});  
    });
 });


// localhost:3000/castle

// router.get("/castle", (req, res) => {
//     res.render("castle");
// });

// localhost:3000/castle
router.post("/", uploadImage("castle"), (req, res) => {
    let {name, phone, email, description} = req.body;
    if(name == "" || phone == "" || email == "" || description == ""){

        res.send("Completa todos los campos");
    } else{

   let img = "";
    if(req.file != undefined){
        img = req.file.filename;
}

  
 let sql = `INSERT INTO warrior (name, phone, email, image, description) VALUES ("${name}", "${phone}", "${email}", "${img}",  "${description}") `;

    connection.query(sql, (error, result) => {
        if(error) throw error;
        res.send("Usuario creado correctamente");
    });
}
});
// localhost:3000/castle/deleteWarrior/:id
router.get("/deleteWarrior/:id", (req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM warrior WHERE warrior_id = ${id}`;
  
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("afterDelete");
    });
  });

  // localhost:3000/castle/editWarrior/:id
router.get("/editWarrior/:id", (req, res) => {
    let id = req.params.id;

    let sql = `SELECT * FROM warrior WHERE warrior_id = ${id}`;
  
    connection.query(sql, (error, result) => {
      if (error) throw error;
      res.render("editWarrior", { result });
    });
  });
  
  // localhost:3000/castle/editWarrior/:id
  router.post("/editWarrior/:id", uploadImage("castle"), (req, res) => {
  let id = req.params.id;
  let { name, phone, email, description } = req.body;
  let sql = `UPDATE warrior SET name = '${name}', phone = '${phone}', email = '${email}'`;

  if (description != "") {
    sql += `, description = '${description}'`;
  }
  if (req.file != undefined) {
    let img = req.file.filename;
    sql += `, image = '${img}'`;
  }

  let sqlFinal = ` WHERE warrior_id = ${id}`;
  sql += `${sqlFinal}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect(`/castle/oneUser/${id}`);
  });
});
  

module.exports = router;



