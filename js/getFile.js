// Import the xlsx library
const XLSX = require('xlsx');

// Function to read data from Excel file and convert it to an array
function excelToArray(filePath) {
    // Load Excel workbook
    const workbook = XLSX.readFile(filePath);
    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];
    // Get worksheet
    const worksheet = workbook.Sheets[sheetName];
    // Convert worksheet to JSON object
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
    // Convert JSON data to array
    const dataArray = [];
    for (let i = 0; i < jsonData.length; i++) {
        const row = jsonData[i];
        const rowData = [];
        for (let j = 0; j < row.length; j++) {
            rowData.push(row[j]);
        }
        dataArray.push(rowData);
    }
    
    return dataArray;
}

// Function to display the array
function displayArray(array) {
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].join('\t'));
    }
}

// Usage
const filePath = 'example.xlsx'; // Change this to your Excel file path
const dataArray = excelToArray(filePath);
displayArray(dataArray);
