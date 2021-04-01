var express = require('express');
var router = express.Router();
var db = require('../crud');


router.get('/fetchAllStudents', async function(req, res) {
    var students = await db.getStudents()
    if(students.code == 200) {
      console.log("fetched all students");
      res.send(students);
    } else{
      res.status(400).send("failed to fetch")

    }

});

router.post("/addStudent", async function(req, res) {
  const name = req.body.name;
  const course = req.body.course;
  var student = await db.addStudent(name,course)
  if(student.code == 200) {
    res.send(student.message);
  } else{
    res.status(400).send(student)
  }
  
})
router.get("/getOneStudent", async function(req, res) {
  const id = req.query.id;
    var student = await db.getOneStudent(id);
    if (student.code == 200){
    res.send(student.message);
    } else {
    res.status(400).send(student)

    }
})

router.patch("/updateStudent", async function(req, res) {
  const id = req.query.id;
  const course = req.body;
  var student = await db.updateStudent(id,course);
  if (student.code == 200){
  res.send(student.message);
  } else {
  res.status(400).send(student)

  }
})

router.delete("/deleteStudent", async function(req, res) {
    const id = req.query.id;
    var student = await db.deleteStudent(id);
    if (student.code == 200){
    res.send("deleted successfully");
    } else {
    res.status(400).send(student)

    }
})

module.exports = router;
