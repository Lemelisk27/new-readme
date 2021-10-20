const inquirer = require("inquirer")
const inquier = require("inquirer")
const generateFile = require("./utils/generateFile")
let licenseGen = false
let licenseVar = ""
const creditsArray = []

title()

function title() {
    inquier
        .prompt([
            {
                type: "input",
                message: "Please Enter a Title",
                name: "title"
            }
        ]).then(titleAns => {
            generateFile.writeTitle(titleAns)
            license()
        })
}

function license () {
    inquier
        .prompt([
            {
                type: "list",
                message: "Do you want to enter a license?",
                name: "licenseChoice",
                choices: ["Yes","No"]
            }
        ]).then(licenseChoiceAns => {
            if (licenseChoiceAns.licenseChoice === "No") {
                description()
            }
            else {
                inquier
                    .prompt([
                        {
                            type: "list",
                            message: "Please choose a license for your application.",
                            name: "license",
                            choices: ['MIT', 'GNU', 'Apache', 'ISC', 'BSD']
                        }
                    ]).then(licenseAns => {
                        licenseGen = true
                        licenseVar = licenseAns.license
                        generateFile.writeLicenseBadge(licenseAns)
                        description()
                    })
            }
        })
}

function description () {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Please Enter a Description",
                name: "description"
            }
        ]).then(descAns => {
            generateFile.writeDescription(descAns)
            tableOfContents()
        })
}

function tableOfContents () {
    inquier
        .prompt([
            {
                type: "list",
                message: "Do you want to include a Table of Contents?",
                name: "tableChoice",
                choices: ["Yes","No"]
            }
        ]).then(tableChoiceAns => {
            if (tableChoiceAns.tableChoice === "No") {
                installation()
            }
            else {
                inquier
                    .prompt([
                        {
                            type: "checkbox",
                            message: "What do you want to include in the Table of Contents?",
                            name: "tableOfContents",
                            choices: ["Installation","Usage","Credits","License"]
                        }
                    ]).then(tableOfContentsAns => {
                        generateFile.writeTableOfContents(tableOfContentsAns)
                        installation()
                    })
            }
        })
}

function installation () {
    inquier
        .prompt([
            {
                type: "list",
                message: "Do you want to include an Installation section?",
                name: "installChoice",
                choices: ["Yes","No"]
            }
        ]).then(installChoiceAns => {
            if (installChoiceAns.installChoice === "No") {
                usageTitle()
            }
            else {
                inquier
                    .prompt([
                        {
                            type: "input",
                            message: "Please enter Installation information.",
                            name: "installInfo"
                        }
                    ]).then(installInfoAns => {
                        generateFile.writeInstall(installInfoAns)
                        usageTitle()
                    })
            }
        })
}

function usageTitle () {
    inquier
        .prompt([
            {
                type: "list",
                message: "Do you want to include a Usage section?",
                name: "usageTitle",
                choices: ["Yes","No"]
            }
        ]).then(usageTitleAns => {
            if (usageTitleAns.usageTitle === "No") {
                credits()
            }
            else {
                inquier
                    .prompt([
                        {
                            type: "input",
                            message: "Please enter usage information.",
                            name: "usageInfo"
                        }
                    ]).then(usageInfoAns => {
                        generateFile.writeUsageTitle(usageInfoAns)
                        usageURL()
                    })
            }
        })
}

function usageURL () {
    inquier
        .prompt([
            {
                type: "list",
                message: "Do you want to include a link in your usage section?",
                name: "usageURL",
                choices: ["Yes","No"]
            }
        ]).then(usageURLAns => {
            if (usageURLAns.usageURL === "No") {
                usageScreenshot()
            }
            else {
                inquier
                    .prompt([
                        {
                            type: "input",
                            message: "What is the title of the link? (Leave blank to use the link itself)",
                            name: "titleURL"
                        },
                        {
                            type: "input",
                            message: "What is the link?",
                            name: "linkURL"
                        }
                    ]).then(usageURLAns => {
                        generateFile.writeUsageURL(usageURLAns)
                        usageScreenshot()
                    })
            }
        })
}

function usageScreenshot () {
    inquier
        .prompt([
            {
                type: "list",
                message: "Do you want to include a screenshot? (Must be in your assets/images folder)",
                name: "screenshot",
                choices: ["Yes","No"]
            }
        ]).then(screenshotAns => {
            if (screenshotAns.screenshot === "No") {
                credits()
            }
            else {
                generateFile.writeUsageScreenshot()
                credits()
            }
        })
}

function credits () {
    inquier
        .prompt([
            {
                type: "list",
                message: "Do you want to include a Credits section?",
                name: "creditChoice",
                choices: ["Yes","No"]
            }
        ]).then(creditChoiceAns => {
            if (creditChoiceAns.creditChoice === "No") {
                licenseInfo(licenseGen, licenseVar)
            }
            else {
                creditsAdd()
            }
        })
}

function creditsAdd () {
    inquier
    .prompt([
        {
            type: "input",
            message: "What is the name?",
            name: "username"
        },
        {
            type: "input",
            message: "What is their GitHub username?",
            name: "github"
        }
    ]).then(creditAns => {
        creditsArray.push(creditAns)
        inquier
            .prompt([
                {
                    type: "list",
                    message: "Do you want to add someone else?",
                    name: "creditsAdd",
                    choices: ["Yes","No"]
                }
            ]).then(creditsAddAns => {
                if (creditsAddAns.creditsAdd === "Yes") {
                    creditsAdd()
                }
                else {
                    generateFile.writeCredits(creditsArray)
                    licenseInfo(licenseGen, licenseVar)
                }
            })
    })
}

function licenseInfo (a, b) {
    if (a) {
        generateFile.writeLicenseInfo(b)
        contribute()
    }
    else {
        contribute()
    }
}

function contribute () {
    inquier
        .prompt([
            {
                type: "list",
                message: "Would you like to include a Contribution section?",
                name: "contribChoice",
                choices: ["Yes","No"]
            }
        ]).then(contribChoiceAns => {
            if (contribChoiceAns.contribChoice === "No") {
                tests()
            }
            else {
                inquier
                    .prompt([
                        {
                            type: "input",
                            message: "How can people contribute?",
                            name: "contribute"
                        }
                    ]).then(contributeAns => {
                        generateFile.writeContribute(contributeAns)
                        tests()
                    })
            }
        })
}

function tests () {
    inquier
        .prompt([
            {
                type: "list",
                message: "Would you like to add a Tests section?",
                name: "testsChoice",
                choices: ["Yes","No"]
            }
        ]).then(testsChoiceAns => {
            if (testsChoiceAns.testsChoice === "No") {
                questions()
            }
            else {
                inquier
                    .prompt([
                        {
                            type: "input",
                            message: "How can someone test the build?",
                            name: "tests"
                        }
                    ]).then(testsAns => {
                        generateFile.writeTests(testsAns)
                        questions()
                    })
            }
        })
}

function questions () {
    inquier
        .prompt([
            {
                type: "input",
                message: "What is your email address?",
                name: "useremail"
            }
        ])
}