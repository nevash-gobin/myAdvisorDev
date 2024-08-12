// Import the file system module
const fs = require('fs');
// Import the 'getAcademicHistory' function from 'parser.js'
const { getAcademicHistory,parse} = require('./parser');

// Check if a file path was provided as a command-line argument
if (process.argv.length < 3) {
    console.log("Usage: node processPDF.js <path_to_pdf_file>");
    process.exit(1);
}
//PDF file path is transcript.pdf
// Read the PDF file path from the command-line arguments
const pdfFilePath = process.argv[2];
console.log(pdfFilePath)

// Read the PDF file into a Buffer
fs.readFile(pdfFilePath, async (err, fileBuffer) => {
    if (err) {
        console.error("Error reading the PDF file:", err);
        return;
    }

    try {
        // Call 'getAcademicHistory' with the file buffer
        // const historyResult = await parse(fileBuffer);
        const historyResult = await getAcademicHistory(fileBuffer);

        // Write the result to 'results.json'
        fs.writeFile('results.json', JSON.stringify(historyResult, null, 2), (err) => {
            if (err) {
                console.error("Error writing to 'results.json':", err);
                return;
            }

            console.log("The academic history has been written to 'results.json'");
        });
    } catch (error) {
        console.error("Error processing the academic history:", error);
    }
});



// read transcript in from command linke argument