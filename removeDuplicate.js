const fs = require('fs');
const readline = require('readline');


// Function to read the file line by line and ensure uniqueness
function removeDuplicates(inputFile, outputFile) {
  const uniqueLines = new Set();

  const rl = readline.createInterface({
    input: fs.createReadStream(inputFile),
    output: process.stdout,
    terminal: false
  });

  rl.on('line', line => {
    // Check if the line is not already present
    if (!uniqueLines.has(line)) {
      uniqueLines.add(line);
    }
  });

  rl.on('close', () => {
    // Write unique lines to the output file
    const outputStream = fs.createWriteStream(outputFile);
    for (const line of uniqueLines) {
      outputStream.write(line + '\n');
    }
    outputStream.end();
    console.log('Duplicates removed. Unique lines saved to', outputFile);
  });
}

// Usage: node script.js input.txt output.txt
const inputFile = process.argv[2];
const outputFile = process.argv[3];

removeDuplicates(inputFile, outputFile);
// to run, "node removeDuplicate.js blocklist.txt blocklist2.txt"