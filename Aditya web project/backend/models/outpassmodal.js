const mongoose = require("mongoose");

const outpassSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    destination: String,
    reason: String,

    fromDate: Date,
    toDate: Date,

    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    }

}, { timestamps: true });

module.exports = mongoose.model("Outpass", outpassSchema);