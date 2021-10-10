const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
import { Feature } from '@models/Feature';

const userSchema = new Schema({
    email: String, 
    name: String,
    image: {
        data: Buffer,
        contentType: String
    },
    showSubWarning: {
        type: Boolean,
        default: true
    },
    features: [{
        type: Schema.Types.ObjectId,
        ref: "Feature"
    }],
},
{ timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);