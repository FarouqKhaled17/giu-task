steps before starting the project
1. open visual studio code
2. open folder and select folder AssignmentTemplate
3. open terminal from view

You are required to download visual studio code
You are required to download and install node js
You are not allowed to use any external library
Any external library requires npm installation
You are allowed to use any library that doesnot requires npm installation
You can use any predefined methods
Using an external library will result in receiving a zero grade

The require keyword is used to import a library
You need to search for fs.readFileSync() and fs.writeFileSync() functions
in order to read and write from a text file.

You will write your code only in the main.js
Submit your code inside main.js 
You are not allowed to run your code inside main.js 
as we created an automated tool that run all submissions. 
The automated tool will provide a zero grade if you ran your code inside main.js

Don't remove any function signature even if you didn't implement it
Don't test any functions inside main.js 
main.js is the file for implementing your functions not testing them
run your code at testScenerio.js using node testScenerio.js 

How to run publicTestsCases.js

1. Make sure that you have publicTestsFiles inside your AssignmentTemplate
2. Make sure that the publicTestsFiles folder contains 
    addCoursesTestCase1.txt,addGradesTestCase1.txt,
    addGradesTestCase2.txt,addStudentsTestCase1.txt,
    coursesPublic.txt,gradesPublic.txt,studentsPublic.txt,
    updateCourseInfoTestCase1.txt,updateCourseInfoTestCase2.txt,
    updateCourseInfoTestCase3.txt, and folder output
3. Make sure that main.js, testScenerio.js, and publicTestsCases.js are within the same folder AssignmentTemplate
4. You need to open terminal from visual studio code
5. node publicTestsCases.js

Inside main.js

Make sure to keep all signatures of functions
if you remove one of nine functions it will cause errors in main

Don't write any testing code inside main.js
if you did you will recieve a zero grade

don't remove module.exports block
By default javascript functions and attributes are private with the file
by using module.exports then functions are becoming public and
can be used in other files 
any function inside module.exports are public