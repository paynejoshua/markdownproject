const fs = require("fs")
const inquirer = require("inquirer")
const generateMarkdown = require("./utils/generateMarkdown.js")

// array of questions for user
const questions = [{
    name: "Title",
    message: "What is the title of your project",
    default: "",

},
{
    name: "Description",
    message: "Please describe your project",
    default: "No description provided.",
},
{
    name: "InstallationInstructions",
    message: "How does one install your project?",
    default: "No installation instructions provided.",
},
{
    name: "UsageInformation",
    message: "How is this project meant to be used?",
    default: "No usage information provided.",
},
{
    name: "ContributionGuidelines",
    message: "What are your contribution guidelines for this project?",
    default: "No contribution guidelines provided.",
},
{
    name: "TestInstructions",
    message: "Have you written tests for this project? If so how does one run them?",
    default: "No test instructions provided.",
},

{
    name: "License",
    message: "What license would you like to use?",
    type: "list",
    choices: ["1", "2", "3"],
    default: "no license selected",
},
{
    name: "github",
    message: "What is your github username?",
    default: "Username not provided",
},
{
    name: "email",
    message: "What is your email for further questions about this project?",
    default: "No email has been provided",
}


];

// function to write README file
function writeToFile(fileName, data) {
   if(fs.existsSync(fileName)){
       fs.unlinkSync(fileName)
   }

    let titleAnswer = data["Title"];
    let descriptionAnswer = data["Description"];
    let installAnswer = data["InstallationInstructions"];
    let usageAnswer = data["UsageInformation"];
    let contributeAnswer = data["ContributionGuidelines"];
    let testAnswer = data["TestInstructions"];
    let licenseAnswer = data["License"];
    let githubAnswer = data["github"];
    let emailAnswer = data ["email"];

    fs.appendFileSync(fileName, generateMarkdown("Title"));
    fs.appendFileSync(fileName, titleAnswer + '\n');
    fs.appendFileSync(fileName, generateMarkdown("Description") + '\n');
    fs.appendFileSync(fileName, descriptionAnswer + '\n');
    fs.appendFileSync(fileName, generateMarkdown("Table of contents") + '\n');
    fs.appendFileSync(fileName, "[Installation](#installation)" + '\n');
    fs.appendFileSync(fileName, "[Usage](#usage)" + '\n');
    fs.appendFileSync(fileName, "[Contributing](#contributing)" + '\n');
    fs.appendFileSync(fileName, "[Tests](#tests)" + '\n');
    fs.appendFileSync(fileName, "[License](#license)" + '\n');
    fs.appendFileSync(fileName, "[Questions](#questions)" + '\n');
    fs.appendFileSync(fileName, generateMarkdown("Installation")+ '\n');
    fs.appendFileSync(fileName, installAnswer + '\n');
    fs.appendFileSync(fileName, generateMarkdown("Usage")+ '\n');
    fs.appendFileSync(fileName, usageAnswer + '\n');
    fs.appendFileSync(fileName, generateMarkdown("Contributing")+ '\n');
    fs.appendFileSync(fileName, contributeAnswer+ '\n');
    fs.appendFileSync(fileName, generateMarkdown("Tests")+ '\n');
    fs.appendFileSync(fileName, testAnswer + '\n');
    fs.appendFileSync(fileName, generateMarkdown("License")+ '\n');
    fs.appendFileSync(fileName, licenseAnswer + '\n');
    fs.appendFileSync(fileName, generateMarkdown("Questions"));
    fs.appendFileSync(fileName, `www.github.com/${githubAnswer}`+ '\n');
    fs.appendFileSync(fileName, `If you have any further questions feel free to email me at: <${emailAnswer}>` + '\n');
}

// function to initialize program
function init() {
    inquirer.prompt(questions)
  .then(answers => {
    console.log('Answers:', answers);
    writeToFile("README.md", answers)
  });
}

// function call to initialize program
init();
