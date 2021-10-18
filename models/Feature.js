const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const featureSchema = new Schema({
    id: String,
    name: String,
    description: String,
    dev_team: String,
    phase: String,
    owner: String,
    product_domain: String,
    date: Date
}
);



module.exports = mongoose.models.Feature || mongoose.model('Feature', featureSchema);