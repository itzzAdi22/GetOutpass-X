const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/outpassController");

router.post("/", auth, ctrl.createOutpass);
router.get("/", auth, ctrl.getOutpasses);
router.put("/:id", auth, ctrl.updateStatus);
router.delete("/:id", auth, ctrl.deleteOutpass);

module.exports = router;