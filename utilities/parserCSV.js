

const csv = require('csv-parse');
const fs = require('fs');

// Read CSV file and copy contents to a 2D array
function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(Object.values(data)))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

// Usage example
readCSV('path/to/file.csv')
  .then((data) => {
    // At this point, 'data' will contain the CSV contents as a 2D array
    console.log(data);
    // Now you can use Sequelize to work with the data as needed
  })
  .catch((error) => {
    console.error('Error reading CSV:', error);
  });


// // Function to read the CSV file as plain text
// function readCSV(filePath) {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         console.error('Error reading CSV file:', err);
//         return;
//       }
  
//       processCSVData(data);
//     });
//   }

// // Process the data from the CSV file
// function processCSVData(data) {
//     const lines = data.split("\n");
//     const line1 = line1[0].split(",");

//     const headers = [line1[0], line1[1], line1[2], line1[3]]
//     const 
// }

// async function parseCSV(file){
//     const line1 = await
//     const text = await getPDFText(file);
//     var studentData = await getStudentData(text);
// console.log("Student data "+ studentData.COMP3609);
//     return studentData;
    
// }


module.exports = {parserCSV}