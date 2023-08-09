const XLSX = require('xlsx');

function parseCourses(data) {
  const courses = [];

  for (let j = 4; j < data.length; j++) {
    let course = {};
    for (let i = 0; i < 7; i++) {
      const header = data[0][i];
      const value = data[j][i];
      course[header] = value;
    }
    courses.push(course);
  }

  return courses;
}

function parseProgrammes(data) {
  const programmes = [];
  const headers = [];

  for (let row = 0; row < 4; row++) {
    headers.push(data[row][7]);
  }

  for (let i = 8; i < data[0].length; i++) {
    let programme = {};
    for (let row = 0; row < 4; row++) {
      const value = data[row][i];
      programme[headers[row]] = value;
    }
    programmes.push(programme);
  }

  return programmes;
}

function parseProgrammeCourses(data) {
  const programmeCourses = [];

  for (let column = 8; column < data[0].length; column++) {
    let programmeId = data[0][column];

    for (let row = 4; row < data.length; row++) {
      let courseCode = data[row][0];
      let cell = data[row][column];
      let programmeCourse = {};

      if (cell !== undefined) {
        var pattern = /(\d+)(?:,\s*(.+))?/;
        var match = cell.match(pattern);

        if (match) {
          var typeId = match[1];
          var prereq = match[2] || '';
          prereq = prereq.replace(/\s+(AND|OR)\s+/g, ' $1 ');

          programmeCourse["programmeId"] = programmeId;
          programmeCourse["courseCode"] = courseCode;
          programmeCourse["typeId"] = typeId;

          // prereqData = prereq.split(" ");
          // console.log("prereqData: ", prereqData);

          // code to create groups here
        }
      }

      if (Object.keys(programmeCourse).length !== 0) {
        programmeCourses.push(programmeCourse);
      }
    }
  }

  return programmeCourses;
}


function categorizeCourses(prereqData, groupId, existingGroups) {
  let groups = [];
  let group = {};
  let keepGroup = false;
  let prereqArr = [];
  let currentGroup = {};
  let prerequisite={};
  
  
  for (const i in prereqData) {
    let item = prereqData[i];

    if (item !== "AND" && item !== "OR") {
      prereqArr.push(item);

      if (keepGroup) {
        currentGroup["courseCode"] = prereqArr;
       
        keepGroup = false;
      } else {
        currentGroup = {};
        currentGroup["groupId"] = groupId;
        currentGroup["courseCode"] = prereqArr; 
        prerequisite={};
        prerequisite["groupId"] = groupId;
      }
    } else if (item === 'AND') {
      keepGroup = true;
      continue;
    } else if (item === 'OR') {
      const courseCode = prereqArr.join(","); // Convert courseCode array to a string
      
      // Check for duplicate groups based on courseCode alone
      if (!existingGroups[courseCode]) {
        groups.push(currentGroup);
        existingGroups[courseCode] = true;
      }

      prereqArr = [];
      groupId++;
    }
  }

  const courseCode = prereqArr.join(","); // Convert courseCode array to a string
  if (!existingGroups[courseCode]) {
    groups.push(currentGroup);
    existingGroups[courseCode] = true;
  }
  return [groups, groupId, prerequisite];
}

function parseGroups(data, groupId) {
  let allGroups=[];
  
  let existingGroups = {};
    for (let column = 8; column < data[0].length; column++) {
        let programmeId = data[0][column];

        for (let row = 4; row < data.length; row++) {
            let courseCode = data[row][0];
            let cell = data[row][column];

            if (cell !== undefined) {
                var pattern = /(\d+)(?:,\s*(.+))?/;
                var match = cell.match(pattern);

                if (match) {
                    var prereq = match[2] || '';
                    prereq = prereq.replace(/\s+(AND|OR)\s+/g, ' $1 ');

                    prereqData = prereq.split(" ");

                    if (!prereqData.includes('')){
                      let [groups,groupID,prerequisite] = categorizeCourses(prereqData, groupId, existingGroups);
                      groupId=groupID;
                      for(let g in groups){
                        
                        // console.log(groups[g]);
                        allGroups.push(groups[g]);
                        groupId++;
                      }
                      
                      
                    }
                    
                }
            }
        }
    }
    
    return allGroups;
}

function parsePrerequisites(data, groups){
let prerequisites =[];
let prerequisite ={};
let groupsArray =[];
  
  for (let column = 8; column < data[0].length; column++) {
    let programmeId = data[0][column];

    for (let row = 4; row < data.length; row++) {
      let courseCode = data[row][0];
      let cell = data[row][column];
      let programmeCourse = {};

      if (cell !== undefined) {
        var pattern = /(\d+)(?:,\s*(.+))?/;
        var match = cell.match(pattern);

        if (match) {
          var typeId = match[1];
          var prereq = match[2] || '';
          prereq = prereq.replace(/\s+(AND|OR)\s+/g, ' $1 ');
          prereqData = prereq.split(" ");
          
          if (!prereqData.includes('')){
            prerequisite = {};
              groupsArray=[];
            // console.log("courseCode::> ", courseCode);
            // console.log("programmeId::> ", programmeId);
            for( let group in groups){
              for( let i=0;i<prereqData.length;i++){
                if(prereqData[i] == groups[group].courseCode ){
                  groupId = groups[group].groupId;
                  groupsArray.push(groupId);
                  // console.log("GroupId::> ", groupId);
                }
              }
            }
            prerequisite["courseCode"] = courseCode;
            prerequisite["groupId"] = groupsArray;
            prerequisite["programmeId"] = programmeId;
            prerequisites.push(prerequisite);
            // console.log(prereqData);
          }
          
          
          
          
          
          
          
          
        }
      }
    }
  }
  return prerequisites;
}

function parseTypes(data){
  const types =[];

  for (let j = 3; j < data.length-1; j++){
    let type={};
    for(let i=0;i<2;i++){
      const header=data[2][i];
      const value= data[j][i];
      type[header]=value;
    }
    types.push(type);
  }
  // console.log("types: ", types);
  return types;
    
}

function parseElectiveRequirements(data){
  const programmeId = [];
  const typeIds = [];
  const amounts = [];
  let columnIndex;
  let electiveRequirements=[];
  let ER ={};
  
  for( columnIndex=2;columnIndex<data[0].length ;columnIndex++){
    
    programmeId.push(data[0][columnIndex]);
    for (let rowIndex = 3; rowIndex < data.length-1; rowIndex++){
      typeIds.push(data[rowIndex][0]);
      if(data[rowIndex][columnIndex] !== undefined){
        ER ={};
        ER["programmeId"]=data[0][columnIndex];        
        ER["typeId"]=data[rowIndex][0];        
        ER["amount"]=data[rowIndex][columnIndex];
        electiveRequirements.push(ER);
        
        amounts.push( data[rowIndex][columnIndex] );
      }
      
    }
    
  }
  // console.log("ProgrammeIds: ",programmeId);
  // console.log("typeIds: ", typeIds);
  // console.log("amounts: ", amounts);
  // console.log("ElectiveRequirements: ", electiveRequirements);

  return electiveRequirements
  
}


function parse_xlsx(xlsxData) {

  let sheetdata1={};
  let sheetdata2={};
  
  // Convert buffer to Uint8Array
  const bufferArray = new Uint8Array(xlsxData);

  // Load the XLSX workbook from the bufferArray
  const workbook = XLSX.read(bufferArray, { type: "array" });

//   const workbook = XLSX.readFile(filename);

  workbook.SheetNames.forEach(sheetName => {
    // Get the sheet by its name
    const worksheet = workbook.Sheets[sheetName];
    // console.log("name: ", sheetName);
    
    if(sheetName == "ProgrammeCourses"){

      let allGroups = [];
      let groupId=1;
      
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      let groups = parseGroups(data, groupId)
      sheetdata1 = {
        courses: parseCourses(data),
        programmes: parseProgrammes(data),
        programmeCourses: parseProgrammeCourses(data),
        groups: groups,
        prerequisites: parsePrerequisites(data, groups),
      };
      
    }

    if(sheetName == "Elective Requirements"){

      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      sheetdata2 = {
        types: parseTypes(data),
        electiveRequirements: parseElectiveRequirements(data),
        
      }
      
    }
    
  });
  
  return [sheetdata1, sheetdata2]
  
}

// data = parse_xlsx("myAdvisor-datasheet.xlsx");
// console.log("Sheetdata 1: ", data[0]);
// console.log("Sheetdata 2: ", data[1]);
// console.log("courses: ", data[0].courses);
// console.log("programmes: ", data[0].programmes);
// console.log("programmeCourses: ", data[0].programmeCourses);
// console.log("groups: ", data[0].groups);
// console.log("prerequisites: ", data[0].prerequisites);

module.exports = { parse_xlsx };
