const fs = require("fs");


function getStudentInfo(studentFile, studentID) {
    try {
        const lines = fs.readFileSync(studentFile, "utf8").split("\n");
        for (let i = 1; i < lines.length; i++) {
            const [id, name, email, major] = lines[i].split(",").map(field => field.trim());
            if (id === studentID) {
                return { id, name, email, major };
            }
        }
        return {};
    } catch (error) {
        console.error("Error reading the file:", error);
        return {};
    }
}

function getCourseInfo(courseFile, courseID) {
    try {
        const lines = fs.readFileSync(courseFile, "utf8").split("\n");
        for (let i = 1; i < lines.length; i++) {
            const [id, code, name, creditHours] = lines[i].split(",").map(field => field.trim());
            if (id === courseID) {
                return { id, code, name, creditHours };
            }
        }
        return {};
    }
    catch (error) {
        console.error("Error reading the file:", error);
        return {};
    }
}

function searchCoursesByCreditHours(courseFile, creditHours) {
    try {
        const lines = fs.readFileSync(courseFile, "utf8").split("\n");
        const courses = [];
        for (let i = 1; i < lines.length; i++) {
            const [id, code, name, credit] = lines[i].split(",").map(field => field.trim());
            if (parseInt(credit) === creditHours) {
                courses.push({ id, code, name, credit });
            }
        }
        return courses;
    }
    catch (error) {
        console.error("Error reading the file:", error);
        return [];
    }
}


function deleteStudentInfo(studentFile, studentID) {
    try {
        const lines = fs.readFileSync(studentFile, "utf8").split("\n");
        const newLines = [];
        let found = false;
        for (let i = 0; i < lines.length; i++) {
            const [id] = lines[i].split(",").map(field => field.trim());
            if (id !== studentID) {
                newLines.push(lines[i]);
            } else {
                found = true;
            }
        }
        fs.writeFileSync(studentFile, newLines.join("\n"));
        if (found) {
            return "Successfully deleted";
        } else {
            return `Student ID ${studentID} does not exist`;
        }
    } catch (error) {
        console.error("Error reading the file:", error);
        return "An error occurred during deletion";
    }
}

function updateCourseInfo(courseFile, courseObject) {
    try {
        const lines = fs.readFileSync(courseFile, "utf8").split("\n");
        const newLines = [];
        let found = false;

        for (let i = 0; i < lines.length; i++) {
            const [id, code, name, creditHours] = lines[i].split(",").map(field => field.trim());
            if (id === courseObject.id.toString()) {
                const updatedCode = courseObject.code || code;
                const updatedName = courseObject.name || name;
                const updatedCreditHours = courseObject.creditHours || creditHours;

                newLines.push(`${id}, ${updatedCode}, ${updatedName}, ${updatedCreditHours}`);
                found = true;
            } else {
                newLines.push(lines[i]);
            }
        }

        if (found) {
            fs.writeFileSync(courseFile, newLines.join("\n"));
        }
    } catch (error) {
        console.error("Error reading the file:", error);
    }
}

function addStudent(studentFile, studentObject) {
    try {
        const lines = fs.readFileSync(studentFile, "utf8").split("\n");
        for (let i = 1; i < lines.length; i++) {
            const [id] = lines[i].split(",").map(field => field.trim());
            if (id === studentObject.id.toString()) {
                return {};
            }
        }
        const firstName = studentObject.name.split(" ")[0].toLowerCase();
        const lastName = studentObject.name.split(" ")[1].toLowerCase();
        const email = `${firstName}.${lastName}@student.giu-uni.de`;
        const newStudent = `${studentObject.id}, ${studentObject.name}, ${email}, ${studentObject.major}`;
        fs.appendFileSync(studentFile, `\n${newStudent}`);
        return { id: studentObject.id, name: studentObject.name, email, major: studentObject.major };
    } catch (error) {
        console.error("Error reading the file:", error);
    }
}



function addCourse(courseFile, courseObject) {
    try {
        const lines = fs.readFileSync(courseFile, "utf8").split("\n");
        for (let i = 1; i < lines.length; i++) {
            const [id] = lines[i].split(",").map(field => field.trim());
            if (id === courseObject.id.toString()) {
                return {};
            }
        }
        const newCourse = `${courseObject.id}, ${courseObject.code}, ${courseObject.name}, ${courseObject.creditHours}`;
        fs.appendFileSync(courseFile, `\n${newCourse}`);
        return { id: courseObject.id, code: courseObject.code, name: courseObject.name, creditHours: courseObject.creditHours };
    }
    catch (error) {
        console.error("Error reading the file:", error);
    }
}


function addGrade(gradeFile, gradeObject) {
    // try {
    //     const lines = fs.readFileSync(gradeFile, "utf8").split("\n");
    //     for (let i = 1; i < lines.length; i++) {
    //         const [studentId, courseId] = lines[i].split(",").map(field => field.trim());
    //         if (studentId === gradeObject.studentId.toString() && courseId === gradeObject.courseId.toString()) {
    //             return {};
    //         }
    //     }
    //     const newGrade = `${gradeObject.studentId}, ${gradeObject.courseId}, ${gradeObject.grade}, ${gradeObject.semester}`;
    //     fs.appendFileSync(gradeFile, `\n${newGrade}`);
    //     return { studentId: gradeObject.studentId, courseId: gradeObject.courseId, grade: gradeObject.grade, semester: gradeObject.semester };
    // }
    // catch (error) {
    //     console.error("Error reading the file:", error);
    // }
}


function calculateGPA(gradeFile, courseFile, studentId, semester) {







}

//Make sure to keep all signatures of functions
// if you remove one of nine functions it will cause errors in main
//Don't write any testing code inside main.js
//if you did you will recieve a zero grade
// don't remove module.exports block
// By default javascript functions and attributes are private with the file
// by using module.exports then functions are becoming public and
// can be used in other files 
// any function inside module.exports are public
// no testing in main.js and test in testScenerio.js
module.exports = {
    getStudentInfo,
    getCourseInfo,
    searchCoursesByCreditHours,
    deleteStudentInfo,
    updateCourseInfo,
    addStudent,
    addCourse,
    addGrade,
    calculateGPA
}