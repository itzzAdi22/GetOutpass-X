exports.getOutpasses = async (req, res) => {
    let data;

    if (req.user.role === "admin") {
        data = await Outpass.find().populate("userId", "name email");
    } else {
        data = await Outpass.find({ userId: req.user.id });
    }

    res.json(data);
};