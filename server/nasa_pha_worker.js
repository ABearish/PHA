const {addPHA} = require("./populate")

const data = require('../db/data/data.json');

for (astroid of data) {
    try {
        addPHA((JSON.parse(astroid[1])))
    } catch (err) {
        console.log(`FAILED to save ${astroid} to DB`)
        console.error(`ERROR: ${err}`)
    }
}