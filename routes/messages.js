const router = require("express").Router();
const Message = require("../models/Message");



router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/:consultId", async (req, res) => {
  try {
    const messages = await Message.find({
      consultId: req.params.consultId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;