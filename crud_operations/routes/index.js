var express = require('express');
var router = express.Router();
var Student = require('../models/student');


router.post('/addStudent', async(req,res) => {

  var student = new Student(req.body);
    // console.log(student);

  try {
    const a1 = await student.save();
    res.send("Student added successfully")
    // return {msg: "Student added successfully"}
  } catch (error) {
    // console.log("error in post");
    return {msg: "Something went wrong"}
  }
});

router.get('/getStudents', async(req, res) => {
  try {
    var students = await Student.find();
    res.json(students);
  } catch (error) {
    res.send("There is something went wrong");
  }
});

router.get('/getStudents/:id', async(req, res) => {
  try {
    var id = req.params.id
    var student = await Student.find({name:id}) ;

    // var student = await Student.findById(id); 
    res.json(student);
  } catch (error) {
    res.send("There is something went wrong");
  }
});

router.patch('/updateStudent/:id', async(req, res) => {
  var id = req.params.id;
  // var updateStudent = req.body;

  var student = await Student.findById(id);
  student.branch = req.body.branch;
  try {
    const a1 = await student.save();
    res.send("Student details updated successfully");

  } catch (error) {
    res.send("There is something went wrong");
  }

})

router.delete('/deleteStudent/:id', async(req, res) => {
  var id = req.params.id;
  var student = await Student.findById(id);
  try {
    const a1 = await student.remove();
    res.send("Student removed successfully");

  } catch (error) {
    res.send("There is something went wrong");

  }
})

module.exports = router;
