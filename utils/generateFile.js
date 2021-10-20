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
}

function writeLicenseBadge (resp) {
    fs.appendFile('./dist/README.md',
    `![license badge](https://img.shields.io/badge/license-${resp.license}-blue)\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
}

function writeDescription (resp) {
    fs.appendFile('./dist/README.md',
    `## Description\n${resp.description}\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
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
}

function tableOfContentSelection (resp) {
    for (let i = 0; i < resp.tableOfContents.length; i++) {
        fs.appendFile('./dist/README.md',
        `- [${resp.tableOfContents[i]}](#${resp.tableOfContents[i].toLowerCase()})\n`,
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
    `## Credits\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
    for (let i = 0; i < resp.length; i++) {
        fs.appendFile('./dist/README.md',
        `${resp[i].username} - [GitHub Profile](https://github.com/${resp[i].github})  \n`,
        function (error) {
            if (error) {
                console.log(error)
            }
        })
    }
}

function writeLicenseInfo (resp) {
    const licenseArray = []
    for (let i = 0; i < licenseData.length; i++) {
        licenseArray.push(licenseData[i].license)
    }
    if (licenseArray.includes(resp)) {
        for (let i = 0; i < licenseData.length; i++) {
            if (resp === licenseData[i].license) {
                fs.appendFile('./dist/README.md',
                `## License\nThis Product is licensed under the ${licenseData[i].license} license.  \nFor more information please visit: ${licenseData[i].link}\n`,
                function (error) {
                    if (error) {
                        console.log(error)
                    }
                })
            }
        }
    }
    else {
        fs.appendFile('./dist/README.md',
        `## License\nThis Product is licensed under the ${resp} license.\n`,
        function (error) {
            if (error) {
                console.log(error)
            }
        })
    }
}

function writeContribute (resp) {
    fs.appendFile('./dist/README.md',
    `## How to Contribute  \n${resp.contribute}\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
}

function writeTests (resp) {
    fs.appendFile('./dist/README.md',
    `## Tests  \n${resp.tests}\n`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
}

function writeQuestions (resp) {
    fs.appendFile('./dist/README.md',
    `## Questions  \nIf you have any questions you can contact me directly at ${resp.useremail}. You can also find more of my work on GitHub at [${resp.github}](https://github.com/${resp.github})`,
    function (error) {
        if (error) {
            console.log(error)
        }
    })
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
    writeContribute,
    writeTests,
    writeQuestions,
}