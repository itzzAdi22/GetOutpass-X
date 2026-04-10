const Outpass = require("../models/outpassmodal");

exports.createOutpass = async (req, res) => {
    const { destination, reason, fromDate, toDate } = req.body;

    const outpass = await Outpass.create({
        userId: req.user._id,
        destination,
        reason,
        fromDate,
        toDate
    });

    res.json(outpass);
};