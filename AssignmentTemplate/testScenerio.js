// Don't remove this line
// Line 4 is used to import all functions 
// that are made public from main.js
// keep Line 4 to be able to test your functions 
const { getStudentInfo, getCourseInfo, searchCoursesByCreditHours,
    deleteStudentInfo, updateCourseInfo, addStudent,
    addCourse, addGrade, calculateGPA } = require("./main");

// Example of testing outside main.js
// let coursesFile = "./publicTestFiles/coursesPublic.txt";
// let creditHours = 7;
// let result = searchCoursesByCreditHours(coursesFile, creditHours);
// console.log(result);


// let studentFile = './publicTestFiles/studentsPublic.txt';
// let studentID = '7004827';
// let studentInfo = getStudentInfo(studentFile, studentID);
// console.log(studentInfo);

// let courseFile = './publicTestFiles/coursesPublic.txt';
// let courseID = '17';
// let courseInfo = getCourseInfo(courseFile, courseID);
// console.log(courseInfo);


// let studentFile = './publicTestFiles/studentsPublic.txt';
// let studentID = '7004827';
// let studentInfo = deleteStudentInfo(studentFile, studentID);
// console.log("test case 1", studentInfo);

// studentID = '7036820'
// studentInfo = deleteStudentInfo(studentFile, studentID);
// console.log("test case 2", studentInfo);



// let courseFile = './publicTestFiles/coursesPublic.txt';
// let courseObject = {
//     id: 48,
//     creditHours: 9,
//     name: 'Maths',
// }
// updateCourseInfo(courseFile, courseObject);


// let studentFile = './publicTestFiles/studentsPublic.txt';
// let studentObject = {
//     id: 705206,
//     name: 'John Doe',
//     major: 'Computer Science',
// }
// addStudent(studentFile, studentObject);

let courseFile = './publicTestFiles/coursesPublic.txt';
let courseObject = {
    id: 50,
    code: 'CS101',
    name: 'Arabic',
    creditHours: 9,
}
addCourse(courseFile, courseObject);

