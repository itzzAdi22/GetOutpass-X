const Outpass = require("../models/Outpass");

exports.createOutpass = async (req, res) => {
    const { destination, reason, fromDate, toDate } = req.body;

    const outpass = await Outpass.create({
        userId: req.user.id,
        destination,
        reason,
        fromDate,
        toDate
    });

    res.json(outpass);
};