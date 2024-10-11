const assert = require('assert');
const fileSys = require('fs');
const {getStudentInfo,
    getCourseInfo,
    searchCoursesByCreditHours,
    deleteStudentInfo,
    updateCourseInfo,
    addStudent,
    addCourse,
    addGrade,
    calculateGPA
    } = require("./main");


function readFile(textFile){

    let data = fileSys.readFileSync(textFile, {encoding:'utf8', flag:'r'});
    data = data.split("\n");
    return data;
      
}

function existsPath(filePath){
    return fileSys.existsSync(filePath);
}

function checkTestFilePath(file , mainDir){
    let isFound = true;
    let result = existsPath(file);
    if(result && file.includes(".txt")){
        let mainData = readTextFile(file).replace(/\r/g, "");
        loadFile(file,mainData);
    }
    if(!result){
        const fileArray = file.split("/");
        const fileName = fileArray[fileArray.length-1];
        if(file.includes(".txt") || file.includes(".js")){
            console.log(`You don't have ${fileName} inside ${mainDir}`);
        }else{
            const fileName = fileArray[fileArray.length-2];
            console.log(`You don't have folder ${fileName} inside folder ${mainDir}`);
        }
        isFound = false;
    }
    return isFound
}

function loadFile(textFile , data){
    fileSys.writeFileSync(textFile, data , {encoding:'utf8', flag:'w'}); 
}


function preTestsCheck(studentFile , courseFile , gradeFile , mainDir = "AssignmentTemplate"){
    
    let isFound = true;
    let result = checkTestFilePath("main.js" , mainDir);
    isFound = isFound && result;

    result = checkTestFilePath(base_dir , mainDir);
    isFound = isFound && result;

    result = checkTestFilePath(outputFile , base_dir);
    isFound = isFound && result;

    result = checkTestFilePath(gradeFile , base_dir);
    isFound = isFound && result;

    result = checkTestFilePath(studentFile , base_dir);
    isFound = isFound && result;

    result = checkTestFilePath(courseFile , base_dir);
    isFound = isFound && result;
    
    result = checkTestFilePath(UCITC1 , base_dir);
    isFound = isFound && result;

    result = checkTestFilePath(UCITC2 , base_dir);
    isFound = isFound && result;

    result = checkTestFilePath(UCITC3 , base_dir);
    isFound = isFound && result;

    result = checkTestFilePath(ASTC1 , base_dir);
    isFound = isFound && result;
    
    result = checkTestFilePath(ACTC1 , base_dir);
    isFound = isFound && result;

    result = checkTestFilePath(AGTC1 , base_dir);
    isFound = isFound && result;

    result = checkTestFilePath(AGTC2 , base_dir);
    isFound = isFound && result;

    return isFound;
}

function readTextFile(textFile){
    
    let data = fileSys.readFileSync(textFile, {encoding:'utf8', flag:'r'});
    return data;

}


function testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag = true , checkFileFlag = false , secondArgs = []){
    
    let result;
    let messageError = "your function result doesnot match the output";
    let assertFlag = false;
    let [expectedRes] = secondArgs;
    let fileToRead = args[0];
    let fileRes;
    let assertResultFlag = false;
    let fileMsgError = "Your output file does not match the expected output file";
    try {
        result = callbackfunction(...args);
        assertFlag = true;
        if(checkValueFlag){
            assert.deepStrictEqual(result, expectedOutput , messageError);
        }
        assertResultFlag = true;
        if(checkFileFlag){
            fileRes = readTextFile(fileToRead);
            assert.deepStrictEqual(fileRes.replace(/\r/g, ""),expectedRes.replace(/\r/g, ""),fileMsgError);
        }
        console.log(`${funcName} Test case ${testNo} passed`);
        totalPoints += score
        console.log(`points so far ${totalPoints} out of ${maxScore}`);
    } catch (error) {
        console.log(`${funcName} Test case ${testNo} failed`);
        if(assertResultFlag){
            console.log(`Error message : ${fileMsgError}`);
            console.log(`${funcName}(${args})`);
            let resOutputFile = outputFile + `${funcName}-testCase${testNo}-yourOutput.txt`;
            loadFile(resOutputFile , fileRes);
            console.log(`check your output in ${resOutputFile}`);
            let expectedOutputFile = outputFile + `${funcName}-testCase${testNo}-expectedOutput.txt`;;
            loadFile(expectedOutputFile , expectedRes);
            console.log(`check expected output in ${expectedOutputFile}`);
            //checkFileSim(resOutputFile , expectedOutputFile);
        }else{
            if(assertFlag){
                console.log(`Error message : ${messageError}`);
                console.log(`${funcName}(${args})`);
                console.log("your result is",result);
                console.log("expected output is",expectedOutput);
            }else{
                let errorUserMessage = shortErrorFlag?error.message:error;
                console.log(`Error inside your function : \n`,errorUserMessage);
            }
        }
        console.log(`points so far ${totalPoints} out of ${maxScore}`);
    }

}


function getStudentInfoTestCases(studentFile){
    
    // constant variable
    const funcName = "getStudentInfo";    
    const callbackfunction = getStudentInfo;
    const orgFileData = readTextFile(studentFile);
    
    let testNo = 1;
    let score = 15;
    let studentID = "10002859";
    let args = [studentFile,studentID]
    let expectedOutput = {
        id: '10002859',
        name: 'Hussein Dawood',
        email: 'hussein.dawood@student.giu-uni.de',
        major: 'Informatics and Computer Science'
    };
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score)
    loadFile(studentFile , orgFileData);

    testNo = 2;
    score = 15;
    studentID = "10003857";
    args = [studentFile,studentID]
    expectedOutput = {
        id: '10003857',
        name: 'Fatma Ashraf',
        email: 'fatma.ashraf@student.giu-uni.de',
        major: 'Mechanical Enginnering'
    };
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score)
    loadFile(studentFile , orgFileData);

    testNo = 3;
    score = 10;
    studentID = "10003215";
    args = [studentFile,studentID]
    expectedOutput = {};
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score)
    loadFile(studentFile , orgFileData);
}

function getCourseInfoTestCases(courseFile){
    
    // constant variable
    const funcName = "getCourseInfo";    
    const callbackfunction = getCourseInfo;
    const orgFileData = readTextFile(courseFile);
    
    let testNo = 1;
    let score = 15;
    let courseID = "31";
    let args = [courseFile,courseID]
    // 31,MATH105,Mathematics III: Discrete Mathematics,4
    let expectedOutput = {
        id: '31',
        name: 'Mathematics III: Discrete Mathematics',
        code: 'MATH105',
        creditHours: 4,
    };
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(courseFile , orgFileData);

    testNo = 2;
    score = 15;
    courseID = "16";
    args = [courseFile,courseID]
    // 16,DE101,German 1,4
    expectedOutput = {
        id: '16',
        name: 'German 1',
        code: 'DE101',
        creditHours: 4,
    };
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(courseFile , orgFileData);

    testNo = 3;
    score = 10;
    courseID = "18";
    args = [courseFile,courseID]
    // non exists course id
    expectedOutput = {};
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(courseFile , orgFileData);

}

function searchCoursesByCreditHoursTestCases(courseFile){

    //constant variable
    const funcName = "searchCoursesByCreditHours";    
    const callbackfunction = searchCoursesByCreditHours;
    const orgFileData = readTextFile(courseFile);

    let testNo = 1;
    let score = 25;
    let creditHours = 7;
    let args = [courseFile , creditHours]
    let expectedOutput = [
        {
          id: '22',
          code: 'CSIS201',
          name: 'Computer Science II: Programming II',
          creditHours: 7
        },
        {
          id: '32',
          code: 'INCS101',
          name: 'Programming III',
          creditHours: 7
        }
    ];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(courseFile , orgFileData);

    testNo = 2;
    score = 15;
    creditHours = 3;
    args = [courseFile , creditHours]
    expectedOutput = [];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(courseFile , orgFileData);
}

function deleteStudentInfoTestCases(studentFile){
    
    // constant variable
    const funcName = "deleteStudentInfo";    
    const callbackfunction = deleteStudentInfo;
    const orgFileData = readTextFile(studentFile);

    let testNo = 1;
    let score = 10;
    let studentID = "13009845";
    let args = [studentFile , studentID]
    // student id is not found
    let expectedOutput = `student id ${studentID} does not exist`;
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(studentFile , orgFileData);

    testNo = 2;
    score = 10;
    studentID = "10002805";
    args = [studentFile , studentID]
    // student id is not found
    expectedOutput = `student id ${studentID} does not exist`;
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(studentFile , orgFileData);

    testNo = 3;
    score = 20;
    studentID = "10003823";
    args = [studentFile , studentID]
    // student id is found
    expectedOutput = `successfully deleted`;
    const orgArray = orgFileData.split("\n");
    const expectedData = orgArray.filter(studentRow => !studentRow.includes(studentID)); 
    const expectedRes = expectedData.join("\n");
    let secondArgs = [expectedRes];
    let checkValueFlag = true; 
    let checkFileFlag = true;
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(studentFile , orgFileData);
}


function updateCourseInfoTestCases(courseFile){
    //constant variable
    const funcName = "updateCourseInfo";    
    const callbackfunction = updateCourseInfo;
    const orgFileData = readTextFile(courseFile);
    const checkValueFlag = false;
    const checkFileFlag = true;

    let testNo = 1;
    let score = 20;
    let courseObject = {id:"24",creditHours:6};
    let args = [courseFile , courseObject]
    let expectedOutput = "no expected output";
    let expectedRes = readTextFile(UCITC1);
    let secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(courseFile , orgFileData);

    testNo = 2;
    score = 20;
    courseObject = {id:"14",code:"CSEN203",creditHours:5};
    args = [courseFile , courseObject]
    expectedOutput = "no expected output";
    expectedRes = readTextFile(UCITC2);
    secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(courseFile , orgFileData);

    testNo = 3;
    score = 20;
    courseObject = {id:"31",name:"Math III: Discrete Mathematics",code:"MATH305",creditHours:5};
    args = [courseFile , courseObject]
    expectedOutput = "no expected output";
    expectedRes = readTextFile(UCITC3);
    secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(courseFile , orgFileData);

}

function addStudentTestCases(studentFile){
    // constant variable
    const funcName = "addStudent";    
    const callbackfunction = addStudent;
    const orgFileData = readTextFile(studentFile);
    const checkValueFlag = true;
    const checkFileFlag = true;
    
    let testNo = 1;
    let score = 40;
    let studentObject = {id:"13001024",name:"Farid Kamal",major:"Informatics and Computer Science"};
    let args = [studentFile, studentObject]
    let expectedOutput = {
        id:"13001024",name:"Farid Kamal",
        major:"Informatics and Computer Science",
        email:"farid.kamal@student.giu-uni.de"
    };

    let expectedRes = readTextFile(ASTC1);
    let secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(studentFile , orgFileData);

    testNo = 2;
    score = 10;
    studentObject = {id:"10000864",name:"Farid Kamal",major:"Informatics and Computer Science"};
    args = [studentFile, studentObject]
    expectedOutput = {};
    expectedRes = readTextFile(studentFile);
    secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(studentFile , orgFileData);

}

function addCourseTestCases(courseFile){
    
    // constant variable
    const funcName = "addCourse";    
    const callbackfunction = addCourse;
    const orgFileData = readTextFile(courseFile);
    const checkValueFlag = true;
    const checkFileFlag = true;
    
    let testNo = 1;
    let score = 40;
    let courseObject = {
        id:"51",name:"Machine Learning",
        code:"CSEN501",creditHours:6
    };
    let args = [courseFile, courseObject];
    // 51,CSEN501,Machine Learning,6
    let expectedOutput = {
        id:"51",name:"Machine Learning",
        code:"CSEN501",creditHours:6
    };
    let expectedRes = readTextFile(ACTC1);
    let secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(courseFile , orgFileData);

    testNo = 2;
    score = 10;
    courseObject = {
        id:"46",name:"Machine Learning",
        code:"CSEN501",creditHours:6
    };
    args = [courseFile, courseObject]
    expectedOutput = {};
    expectedRes = readTextFile(courseFile);
    secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(courseFile , orgFileData);

}

function addGradeTestCases(gradeFile){
    
    // constant variable
    const funcName = "addGrade";    
    const callbackfunction = addGrade;
    const orgFileData = readTextFile(gradeFile);
    const checkValueFlag = false;
    const checkFileFlag = true;
    const fixedPoints = totalPoints;

    let testNo = 1;
    let score = 20;
    let gradeObject = {
        studentId : "7002849", courseId : "48", 
        semester : "Winter23", grade : "A+"
    };
    let args = [gradeFile, gradeObject];
    let expectedOutput = "no expected output";
    let expectedRes = readTextFile(AGTC1);
    let secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(gradeFile , orgFileData);

    testNo = 2;
    score = 10;
    gradeObject = {
        studentId : "7036808", courseId : "42", 
        semester : "Winter22", grade : "A+"
    };
    args = [gradeFile, gradeObject];
    expectedOutput = "no expected output";
    expectedRes = readTextFile(AGTC2);
    secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(gradeFile , orgFileData);

    if(fixedPoints == totalPoints){
        return;
    }

    testNo = 3;
    score = 20;
    // 10006840,15,Spring21,B-
    gradeObject = {
        studentId : "10006840", courseId : "15", 
        semester : "Spring22", grade : "B-"
    };
    args = [gradeFile, gradeObject];
    expectedOutput = "no expected output";
    expectedRes = readTextFile(gradeFile);
    secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(gradeFile , orgFileData);

    testNo = 4;
    score = 10;
    // 10006840,15,Spring21,B-
    gradeObject = {
        studentId : "10006840", courseId : "15", 
        semester : "Spring22", grade : "C+"
    };
    args = [gradeFile, gradeObject];
    expectedOutput = "no expected output";
    expectedRes = readTextFile(gradeFile);
    secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(gradeFile , orgFileData);

    testNo = 5;
    score = 10;
    // 10006840,15,Spring21,B-
    gradeObject = {
        studentId : "10006840", courseId : "15", 
        semester : "Spring22", grade : "F"
    };
    args = [gradeFile, gradeObject];
    expectedOutput = "no expected output";
    expectedRes = readTextFile(gradeFile);
    secondArgs = [expectedRes];
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score , checkValueFlag , checkFileFlag , secondArgs);
    loadFile(gradeFile , orgFileData);

}


function calculateGPATestCases(gradeFile , courseFile){

    // constant variable
    const funcName = "calculateGPA";    
    const callbackfunction = calculateGPA;
    const orgGradeData = readTextFile(gradeFile);
    const orgCourseData = readTextFile(courseFile);

    let testNo = 1;
    let score = 20;
    let studentId = "7002849";
    let semester = "";
    let args = [gradeFile , courseFile , studentId , semester]
    let expectedOutput = 2.70;
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(gradeFile , orgGradeData);
    loadFile(courseFile , orgCourseData);

    testNo = 2;
    score = 25;
    studentId = "10006840";
    semester = "";
    args = [gradeFile , courseFile , studentId , semester]
    expectedOutput = 2.50;
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(gradeFile , orgGradeData);
    loadFile(courseFile , orgCourseData);

    testNo = 3;
    score = 25;
    studentId = "10004867";
    semester = "Spring21";
    args = [gradeFile , courseFile , studentId , semester]
    expectedOutput = 1.56;
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(gradeFile , orgGradeData);
    loadFile(courseFile , orgCourseData);

    
    testNo = 4;
    score = 40;
    studentId = "7005806";
    semester = "";
    args = [gradeFile , courseFile , studentId , semester]
    expectedOutput = 2.22;
    testCaseOutputTemplate(callbackfunction , args , expectedOutput , funcName , testNo , score);
    loadFile(gradeFile , orgGradeData);
    loadFile(courseFile , orgCourseData);
}


function runTestCases(studentFile , courseFile , gradeFile){

    let testFlag = preTestsCheck(studentFile , courseFile, gradeFile);
    if(!testFlag){
        console.log("make sure you have the above folder and files\nto be able to run your test cases");
        return;
    }

    getStudentInfoTestCases(studentFile);
    console.log();
    getCourseInfoTestCases(courseFile);
    console.log();
    searchCoursesByCreditHoursTestCases(courseFile);
    console.log();
    deleteStudentInfoTestCases(studentFile);
    console.log();
    updateCourseInfoTestCases(courseFile);
    console.log();
    addStudentTestCases(studentFile);
    console.log();
    addCourseTestCases(courseFile);
    console.log();
    addGradeTestCases(gradeFile);
    console.log();
    calculateGPATestCases(gradeFile , courseFile);
    console.log();
    
    let score = (totalPoints/maxScore) * 100;
    score = score > parseInt(score) ?score+1:score;
    let gradeScore = score == 0?0:score;
    gradeScore = score > 100?100:gradeScore;
    console.log(`Congrats you obtained ${gradeScore} from 100` )
}




let totalPoints = 0;
let maxScore = 500;
let shortErrorFlag = true;

const base_dir = "publicTestFiles/"; //done
let studentFile = base_dir + "studentsPublic.txt"; //done
let courseFile = base_dir + "coursesPublic.txt"; //done
let gradeFile = base_dir + "gradesPublic.txt"; //done
const outputFile = base_dir + "output/"; //done

const UCITC1 = base_dir + "updateCourseInfoTestCase1.txt"; //done
const UCITC2 = base_dir + "updateCourseInfoTestCase2.txt"; //done
const UCITC3 = base_dir + "updateCourseInfoTestCase3.txt"; //done

const ASTC1 = base_dir + "addStudentsTestCase1.txt"; //done
const ACTC1 = base_dir + "addCoursesTestCase1.txt"; //done

const AGTC1 = base_dir + "addGradesTestCase1.txt"; //done
const AGTC2 = base_dir + "addGradesTestCase2.txt"; //done

runTestCases(studentFile , courseFile , gradeFile);





