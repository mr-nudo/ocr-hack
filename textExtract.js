// const program = require("commander");

// program.version("1.0.1").description("Textract Lab");
// program
//   .command("scan <filePath>")
//   .alias("s")
//   .description("scans a file")
//   .action(filePath => {
//   console.log(filePath);
// });
// program.parse(process.argv);

const program = require("commander");
const fs = require("fs");
const textractScan = require("./utils/textractUtils");
program.version("1.0.1").description("Textract Lab");
program
  .command("scan <filePath>")
  .alias("s")
  .description("scans a file")
  .action(async (filePath) => {
    var data = fs.readFileSync(filePath);
    const results = await textractScan(data);
    console.log(results);
  });
program.parse(process.argv);
