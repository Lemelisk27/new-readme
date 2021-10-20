const fs = require("fs")
const licenseData = require("../db/licenses.json")

function writeTitle (resp) {
    fs.writeFile('./dist/README.md',
    `# ${resp.title}\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
    console.log("Title Written")
}

function writeLicenseBadge (resp) {
    fs.appendFile('./dist/README.md',
    `![license badge](https://img.shields.io/badge/license-${resp.license}-blue)\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
    console.log("License Written")
}

function writeDescription (resp) {
    fs.appendFile('./dist/README.md',
    `## Description\n${resp.description}\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
    console.log("Description Written")
}

function writeTableOfContents (resp) {
    fs.appendFile('./dist/README.md',
    `## Table of Contents\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
    tableOfContentSelection(resp)
    console.log("Table of Contents Written")
}

function tableOfContentSelection (resp) {
    for (let i = 0; i < resp.tableOfContents.length; i++) {
        fs.appendFile('./dist/README.md',
        `- [${resp.tableOfContents[i]}](#${resp.tableOfContents[i]})\n`,
        function (error) {
            if (error) {
                console.log(error)
            }
        })
    }
}

function writeInstall (resp) {
    fs.appendFile('./dist/README.md',
    `## Installation\n${resp.installInfo}\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
    console.log("Install Written")
}

function writeUsageTitle (resp) {
    fs.appendFile('./dist/README.md',
    `## Usage\n${resp.usageInfo}  \n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
}

function writeUsageURL (resp) {
    if (resp.titleURL === "") {
        resp.titleURL = resp.linkURL
    }
    fs.appendFile('./dist/README.md',
    `Link - [${resp.titleURL}](${resp.linkURL})  \n`,
    function (error) {
        if (error) {
            console.log(error)
         }
    })
}

function writeUsageScreenshot () {
    fs.appendFile('./dist/README.md',
    `![Screenshot](assets/images/screenshot.png)\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
}

function writeCredits (resp) {
    fs.appendFile('./dist/README.md',
    `## Credits\n${resp.username} - [GitHub Profile](https://github.com/${resp.github})\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
}

function writeLicenseInfo (resp) {
    for (let i = 0; i < licenseData.length; i++) {
        if (resp === licenseData[i].license) {
            fs.appendFile('./dist/README.md',
            `## License\n${licenseData[i].text}\n`,
            function (error) {
                if (error) {
                    console.log(error)
                }
            })
        }
    }
}

module.exports = {
    writeTitle,
    writeLicenseBadge,
    writeDescription,
    writeTableOfContents,
    writeInstall,
    writeUsageTitle,
    writeUsageURL,
    writeUsageScreenshot,
    writeCredits,
    writeLicenseInfo,
}