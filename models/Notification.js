const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const notificationSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    read: Boolean
},
{ timestamps: true }
);

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);