exports.updateStatus = async (req, res) => {
    const outpass = await Outpass.findById(req.params.id);

    if (!outpass) return res.status(404).json({ msg: "Not found" });

    // Only admin can approve/reject
    if (req.user.role !== "admin") {
        return res.status(403).json({ msg: "Not allowed" });
    }

    outpass.status = req.body.status; // approved / rejected
    await outpass.save();

    res.json(outpass);
};