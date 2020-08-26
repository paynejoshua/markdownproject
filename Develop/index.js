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
}

];

// function to write README file
function writeToFile(fileName, data) {
   if(fs.existsSync(fileName)){
       fs.unlinkSync(fileName)
   }

    let titleAnswer = data["Title"]
    let descriptionAnswer = data["Description"]
    let installAnswer = data["InstallationInstructions"]
    let usageAnswer = data["UsageInformation"]
    let contributeAnswer = data["ContributionGuidelines"]
    let testAnswer = data["TestInstructions"]
    let licenseAnswer = data("license")

    fs.appendFileSync(fileName, generateMarkdown(titleAnswer) + '\n')
    fs.appendFileSync(fileName, generateMarkdown(descriptionAnswer)+ '\n')
    fs.appendFileSync(fileName, generateMarkdown(installAnswer)+ '\n')
    fs.appendFileSync(fileName, generateMarkdown(usageAnswer)+ '\n')
    fs.appendFileSync(fileName, generateMarkdown(contributeAnswer)+ '\n')
    fs.appendFileSync(fileName, generateMarkdown(testAnswer)+ '\n')
    fs.appendFileSync(fileName, generateMarkdown(licenseAnswer)+ '\n')
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
