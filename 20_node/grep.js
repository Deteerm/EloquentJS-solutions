const { time, timeEnd } = require("console");
const { readFile, readdir } = require("fs");

if (process.argv.length < 4) throw new Error("Expected at least 2 arguments");

const regex = new RegExp(process.argv[2]);
const files = process.argv.slice(3);
time();
console.log(regex);
runGrep(files);
timeEnd();

function runGrep(files) {
  files.forEach((file) => {
    readdir(file, (err, args) => {
      if (args) {
        runGrep(args.map((el) => file + `/${el}`));
      } else {
        searchFile(file);
      }
    });
  });
}

function searchFile(file) {
  readFile(file, "utf-8", (error, text) => {
    if (error) throw error;
    if (regex.test(text)) {
      console.log(text + " found in " + file);
    }
  });
}
