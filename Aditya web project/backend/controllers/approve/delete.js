exports.deleteOutpass = async (req, res) => {
    await Outpass.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
};