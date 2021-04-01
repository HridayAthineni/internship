const knex = require('./db').knex;
const Student = require('./models/schema');


async function addStudent(name, course) {

    try {
     
        let val = await Student.forge({'name': name, 'course':course}).save();
        return ({code:200, message: val});

    } catch (error) {
        console.log(error);
        return ({code:400, message:"error in adding student"});
    }
}

async function getStudents() {
    try {
        let val = await Student.fetchAll();
        return ({code:200, message: val});
    } catch (error) {
        console.log(error);
        return ({code:400, message:"error in fetching students"});

    }
}

async function getOneStudent(id) {
    try {
        let val = await Student.where({id:id}).fetch();

        return ({code:200, message: val});
    } catch (error) {
        console.log(error);
        return ({code:400, message:"error in fetching student"});

    }
}

async function deleteStudent(id) {
    try {
        let val = await Student.where({id:id}).destroy();
        console.log("USER DELETED");
        return ({code:200, message: val});
    } catch (error) {
        console.log(error);
        return ({code:400, message:"error in deleting students"});

    }
}

async function updateStudent(id,course) {
    try {
        let val = await Student.where('id',id).save(course,{patch:true});
        return ({code:200, message: val});
    } catch (error) {
        console.log(error);
        return ({code:400, message:"error in updating student"});

    }
}

module.exports = {getStudents, addStudent, deleteStudent, getOneStudent, updateStudent}