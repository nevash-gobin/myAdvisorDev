import React from "react";
import "../assets/css/Finish.css";
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from "react";
import { isEqual } from 'lodash';

const Finish = (props) => {

    const history = useHistory(); // Used to redirect to a new path without losing state values
    const [uploaded, setUploaded] = useState(false); // Boolean value to indicate whether or not the advising session has been uploaded
    
    const transcriptDets = props.transcriptDetails;
    
    var totalCreditsCompleted = parseInt(props.studCredComplete) + parseInt(props.newDeg) + parseInt(props.courseInProgCredits); //this is a potential total number of credits completed
    var gradeCombinationsArray; //2D array to contain grade combination
    var potentialGpaArray; //array to hold calculate potential gpa
    var coursesNCredits = [...props.courseInProgNCreds, ...props.courseChoseNCreds];//join two arrays. To store courses a student is pursuing this semester

    //var combinedDegreeGpa; //estimated gpa calculated using prior gpa and current gpa

    //An array containing the grades and their quality points
    const gradesArray = [ {grade: 'A+', qualityPoints: 4.3}, 
                          {grade: 'A', qualityPoints: 4.0},
                          {grade: 'A-', qualityPoints: 3.7},
                          {grade: 'B+', qualityPoints: 3.3},
                          {grade: 'B', qualityPoints: 3.0},
                          {grade: 'B-', qualityPoints: 2.7},
                          {grade: 'C+', qualityPoints: 2.3},
                          {grade: 'C', qualityPoints: 2.0},
                          //{grade: 'F1', qualityPoints: 1.7},
                          //{grade: 'F2', qualityPoints: 1.3},
                          //{grade: 'F3', qualityPoints: 0.0},
                        ];

    // If the user's recommended courses has been lost, redirect to start page to generate them again
    if (props.recCourses === null) { 
        history.push({
        pathname: '/start'
        })
    }

    /*
        Calculate potential gpa and potential degree class
    */

    /*
        priorDegGpaHrs - Prior Degree GPA Hours
        priorDegGpa - Prior Degree GPA
        currDegGpaHrs - Current Degree GPA Hours
        currDegGpa - Current Degree GPA

        FORMULA:
        Combined Degree GPA = ((Prior Degree GPA Hours x Prior Degree GPA) + 
                                (Current Degree GPA Hours x Current Degree GPA)) / 
                                (Prior Degree GPA Hours + Current Degree GPA Hours)
    */
    

    //Function to calculate current degree gpa hours
    function calculateCurrentDegreeGpaHrs(chosenCourseCreds, inProgCourseCreds){
        var currDegGpaHrs = chosenCourseCreds + inProgCourseCreds;
        return currDegGpaHrs;
    }

    //Function to calculate current degree gpa. Need to make sure course credits are all the sme
    function calculateCurrentDegreeGpa(totGradePtsEarned, totQualityPts){
        var currDegGpa = totGradePtsEarned / totQualityPts;
        return currDegGpa;
    }
    
    //function to calculate estimated gpa
    function calculateCombinedDegreeGpa(priDegGpaHrs, priDegGpa, curDegGpaHrs, curDegGpa){
        var estimatedGPA = ((priDegGpaHrs * priDegGpa) + (curDegGpaHrs * curDegGpa)) / (priDegGpaHrs + curDegGpaHrs);
        return estimatedGPA;
    }
    //console.log("testing  "+calculateCombinedDegreeGpa(60, 3.00, 3, 4.3));

    //Function to calculate grade points for a course
    function calculateGradePoints(gradeQualityHrs, gradeQualityPts){
        const gradePoints = gradeQualityHrs * gradeQualityPts;
        return gradePoints;
    }

    //Function to get factorial of a number
    function getFactorial(number){
        var factorial = 1;
        if (number===0){
            return 1;
        }

        for(let j=1; j<=number; j++){
            factorial =  factorial * j;
        }
        return factorial;
    }

    //Function to calculate the number of grade combinations based on number of courses pursuing.
    function calculateNumCombinations(numCoursesR, gradeArrSizeN){
        const top = getFactorial(numCoursesR + gradeArrSizeN - 1);
        const bottom1 = getFactorial(numCoursesR);
        const bottom2 = getFactorial(gradeArrSizeN - 1);
        const numCombos = top / (bottom1 * bottom2);
        return numCombos;
    }

    //Function that creates grade combinations with repeats
    function getGradeCombosWithRepeats(numCourses, gradeArr, gradeArrSize){
        var arrayWithRepeats = [];
        var size = Math.pow(gradeArrSize, numCourses);

        for (var i = 0; i < size; i++) {
            var gradeSet = "";
            for (var j = 0; j < numCourses; j++) {
                if(j===numCourses-1){
                    gradeSet += gradeArr[Math.floor(i / Math.pow(gradeArrSize, j)) % gradeArrSize].grade;
                }
                else{
                    gradeSet += gradeArr[Math.floor(i / Math.pow(gradeArrSize, j)) % gradeArrSize].grade + " ";
                }
            }
            arrayWithRepeats.push(gradeSet);
        }    
        return arrayWithRepeats;
    }

    /*
    //Function to check for repeated characters in a string
    function checkRepeatedCharacters(splitArray){
        var arrGradeQuantity = [];
        var count;

        //for loop to traverse split array to check for repeated characters
        for(var a=0; a<splitArray.length; a++){
            count = 1;
            for(var b=a+1; b<splitArray.length; b++){
                if(splitArray[a] === splitArray[b]){
                    count++;
                }
            }
            
            var isEqual = false;
            const obj = {grade: splitArray[a], quantity: count};
            for(var s1=0; s1<arrGradeQuantity.length; s1++){
                if(arrGradeQuantity[s1].grade === obj.grade){
                    isEqual= true;
                }
            }

            if(isEqual === false){
                arrGradeQuantity.push(obj);
            }

            if(arrGradeQuantity.length===0){
                arrGradeQuantity.push(obj);
            }
        }
        return arrGradeQuantity;
    }
    */

    //Function that checks if two strings of the same length contain the same grades regardless of order.
    function checkStringSameGrades(string1, string2){
        //Original split arrays
        var string1Split = string1.split(" ");
        var string2Split = string2.split(" ");

        //Copy split arrays
        var string1SplitCopy = string1Split;
        var string2SplitCopy = string2Split;

        //Sort both split arrays
        const sortedArr1 = string1SplitCopy.sort();
        const sortedArr2 = string2SplitCopy.sort();
    
        var isTheSame = isEqual(sortedArr1, sortedArr2);
        
        return isTheSame;
    }

    function getGradeCombosWithoutRepeats(arrayWithRepeats, numCourses, numCombos){
        var arrayWithoutRepeats = arrayWithRepeats;

        while(arrayWithoutRepeats.length !== numCombos){ //to cater for extra repeats
            for(var i=0; i<arrayWithoutRepeats.length; i++){
                for(var j=i+1; j<arrayWithoutRepeats.length; j++){
                    if(checkStringSameGrades(arrayWithoutRepeats[i], arrayWithoutRepeats[j])){
                        arrayWithoutRepeats = arrayWithoutRepeats.toSpliced(j, 1);
                    }
                }
            }
        }
        return arrayWithoutRepeats;
    }

    //Function to create grade combinations based on the number of courses a student is pursuing for the semester
    function create2DGradeCombinations(numCourses, gradeArr, gradeArrSize){
        const arraySize = calculateNumCombinations(numCourses, gradeArrSize);
        var combine2DArray = Array(arraySize).fill(0).map(row => new Array(numCourses).fill(1)); //initialize 2D array

        var gradeArrRepeats = getGradeCombosWithRepeats(numCourses, gradeArr, gradeArrSize);
        var gradeArrWithoutRepeats = getGradeCombosWithoutRepeats(gradeArrRepeats, numCourses, arraySize);

        var count = 0;

        for(var i=0; i<combine2DArray.length; i++){
            for(var j=0; j<combine2DArray[i].length; j++){
                var arrSplit = gradeArrWithoutRepeats[count].split(" ");
                combine2DArray[i][j] = arrSplit[j];
            }
            count++;
        }
        return combine2DArray;
    }

    //Function to calculate total quality points
    function calculateTotalQualityPoints(pursueCourses){
        var totQualityPoints = 0;
        for(var i=0; i<pursueCourses.length; i++){
            totQualityPoints = totQualityPoints + pursueCourses[i].credits;
        }
        return totQualityPoints;
    }

    //Calculate total grade points for one combination
    function calculateGradePointsEarned(gradeCombo, gradeArr, pursueCourses){
        var totalGradePointCombo = 0; //total grade point for 1 combination
        for(var m=0; m<gradeCombo.length; m++){
            for(var k=0; k<gradeArr.length; k++){
                if(gradeCombo[m] === gradeArr[k].grade){
                    totalGradePointCombo = totalGradePointCombo + calculateGradePoints(pursueCourses[m].credits, gradeArr[k].qualityPoints);
                }
            }
        }
        

/*
        var tempArr = gradeComboArr;
        for(var i=0; i<tempArr.length; i++){
            for(var j=0; j<tempArr[i].length; j++){
                for(var k=0; k<gradeArr.length; k++){
                    if(tempArr[i][j] === gradeArr[k].grade){
                        
                    }
                }
                const obj = {totalGradePoints: 0};
                tempArr[i].push(obj);
                
            }
        }
        */
        return totalGradePointCombo.toFixed(1);
    }

    //Function to check if all courses have the same credits
    function checkAllCoursesSameCredits(){
        var count = 0;
        if(coursesNCredits!==null){
            var sameCreds = coursesNCredits[0].credits;
            for(var num=0; num<coursesNCredits.length; num++){
                if(coursesNCredits[num].credits === sameCreds){
                    count++;
                }
            }
        }
        
        return count;
    }

    //function to calculate the potential degree gpa for the semester
    function calculatePotentialGpa(){
        const priorDegGpaHrs = transcriptDets.degreeGpaHours; //found on transcript
        //console.log("priorDegGpaHrs  "+priorDegGpaHrs);
        const priorDegGpa = transcriptDets.gpa; //found on transcript
        //console.log("priorDegGpa  "+priorDegGpa);
        gradeCombinationsArray = create2DGradeCombinations(coursesNCredits.length, gradesArray, gradesArray.length);
    
        potentialGpaArray = Array(gradeCombinationsArray.length);
        //console.log(gradeCombinationsArray);

        var inProgressCourseCredits = props.courseInProgCredits; //total credit for in progress courses
        var chosenCourseCredits = props.chosenCoursesCreds; //total credits for chosen courses

        //Check if all courses pursuing have the same credits
        var numCoursesSameCreds = checkAllCoursesSameCredits();
        if(numCoursesSameCreds===coursesNCredits.length){
            for(var f=0; f<gradeCombinationsArray.length; f++){
                var currDegGpaHr = calculateCurrentDegreeGpaHrs(chosenCourseCredits, inProgressCourseCredits); //total credits of courses that you are pursuing this semester (including inprogress course & course chosen for advising)
                //console.log("currDegGpaHrs  "+currDegGpaHr);
                var totalGradePointEarned = calculateGradePointsEarned(gradeCombinationsArray[f], gradesArray, coursesNCredits);
                //console.log("totalGradePointEarned  "+totalGradePointEarned);
                var totalQualityPoints = calculateTotalQualityPoints(coursesNCredits);
                //console.log("totalQualityPoints  "+totalQualityPoints);
                const currDegGpa = calculateCurrentDegreeGpa(totalGradePointEarned, totalQualityPoints); 
                //console.log("currDegGpa  "+currDegGpa);
                const combinedGpaForCombo = calculateCombinedDegreeGpa(priorDegGpaHrs, priorDegGpa, currDegGpaHr, currDegGpa);
                //console.log("combinedGpaForCombo  "+combinedGpaForCombo);
                potentialGpaArray[f] = combinedGpaForCombo;
            }

        }

        //console.log(potentialGpaArray);
        
    }
    //calculatePotentialGpa();

    useEffect(() => {
        props.setProg(100); // Set advising progress to 100%
        props.setShowBotButtons(false); // Hide "Back to courses" and "Finish advising" buttons on sidebar
        //setTotCredComplete(parseInt(props.studCredComplete) + parseInt(props.newDeg) + parseInt(props.courseInProgCredits));//add the credits the student completed so far to the course credits that the student selected from advising 
        
        //getAllPotentialGraduate();
        //console.log("1");
        
        /*
        
        async function getPotentialGraduate() {
            try{
                const res = await fetch("/student/a-potential-graduate/" + localStorage.getItem("username"));
                const parseData = await res.json();
                setPotentialGrad(parseData);
            }
            catch(err){
                console.log("Error: " + err.message);
            }
            /*
            fetch("/student/a-potential-graduate/" + localStorage.getItem("username"))
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    setPotentialGrad(data);
                })
                .catch((err) =>{
                    console.log(err.message);
                });
            */
               
        //}
        
        //getPotentialGraduate();
        
        
    }, []);
    
    useEffect(() => {
        if (!uploaded) { // If advising session has not yet been uploaded
            var requestOptions = { // Create POST request
                method: 'POST',
                headers: {
                    token: localStorage.getItem("token"),
                    "Content-type": "application/json",
                },
                redirect: 'follow'
            };

            fetch(`/student/academic-advising/session/${localStorage.getItem("username")}`, requestOptions) // Make request to server to parse transcript, upload student details and their courses to the database
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
            
            setUploaded(true);
        }

        if(totalCreditsCompleted >= 93){
            if(!props.gradUploaded){//if potential graduate has not been uploaded to database yet
                var requestOptions = { // Create POST request
                    method: 'POST',
                    headers: {
                        token: localStorage.getItem("token"),
                        "Content-type": "application/json",
                    },
                    redirect: 'follow'
                };
                fetch(`/student/potential-graduate/${localStorage.getItem("username")}`, requestOptions) // Make request to server to upload potential graduate
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
                
                props.setGradUploaded(true); 
            }
        }
        
        if((totalCreditsCompleted >= 0 && totalCreditsCompleted < 93)){
            var requestOptions = { // Create POST request
                method: 'GET',
                redirect: 'follow'
            };

            fetch(`/student/potential-graduates/all`, requestOptions) // Make request to server to get all potential graduate
                .then(response => response.json())
                .then((data) => {
                    let graduates = data;

                    if(graduates!==null){
                        graduates.map(function(graduate){ 

                            if(graduate.studentId === parseInt(localStorage.getItem("username"))){ //if potential graduate found in database
                                var requestOptions2 = {//create DELETE request
                                    method: 'DELETE',
                                    headers: {
                                        token: localStorage.getItem("token")
                                    }
                                };

                                fetch(`/student/potential-graduate/delete/${localStorage.getItem("username")}`, requestOptions2) //delete potential graduate
                                    .then(response => response.text())
                                    .then(result => console.log(result))
                                    .catch(error => console.log('error', error));
                            }
                            
                        })
                    }
                })
                .catch(error => console.log('error', error));
        }
    }, [totalCreditsCompleted]);

    // async function uploadAdvisingSession() {
    //     try {
    //       const {data:response} = await axios.post(`/student/academic-advising/session/${localStorage.getItem("username")}`) //use data destructuring to get data from the promise object
    //       return response
    //     }
    //     catch (error) {
    //       console.log(error);
    //     }
    // }


    return (
        <div className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-10">
                        <div className="card almost-card">
                            <div className="card-body">
                                <p className="almost-header blue-txt">You're all done with advising!</p>
                                <p className="almost-text">Here's a list of all the courses you chose:</p>
                                {
                                    Array.from({ length: props.chosenCourses.length }, (_, k) => {
                                        return <p className="course-chosen blue-txt">{props.chosenCourses[k]}</p>
                                    })
                                }
                            </div>
                            {/*
                            <div className="card body-tips" >
                                <p className="almost-header2">Potential Degree Class:</p>
                                <p className="almost-text2">Here's a list of all the courses you chose:</p>
                            </div>

                            */}
                                
                            

                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
  
}

export default Finish;
