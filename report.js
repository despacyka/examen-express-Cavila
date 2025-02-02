import fs from 'node:fs';  // Use promises for easier file handling
import { exec } from 'node:child_process';
import stripAnsi from 'strip-ansi'; // Import as ES module


const fileName = 'test-results.txt';
const runTestsAndSaveOutput = () => {
  exec('cross-env NODE_ENV=test FORCE_COLOR=false jest --json --ci --testTimeout=5000', (error, stdout, stderr) => {
    //"cross-env NODE_ENV=test jest --ci --silent --json --outputFile=test_results.json --testTimeout=5000"
    let output = stdout + '\n' + stderr;
    
    fs.writeFile(fileName, stderr || output, (err) => {
      if (err) {
        console.error(`Error writing to file: ${err}`);
      } else {
        console.log(`Test results saved to ${fileName}`);
      }
    });
  });
};

runTestsAndSaveOutput();
