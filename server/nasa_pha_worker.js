const {add_pha_to_db} = require("../db/data/data.json")
const data = require('../db/data/data.json');

const add_from_json = (json_file) => {
    for (astroid of json_file) {
        try {
            add_pha_to_db((JSON.parse(astroid[1])))
        } catch (err) {
            console.log(`FAILED to save ${astroid} to DB`)
            console.error(`ERROR: ${err}`)
        }
    }
}

//npm run "populate"
add_from_json(data)