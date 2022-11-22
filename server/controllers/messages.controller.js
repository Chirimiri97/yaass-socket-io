const messagesModel = require("../models/messages.model");

// Add message.
exports.addMessage = async (req, res) => {
    try {
        let { room_id, sender_id, text } = req.body;
        let new_message = new messagesModel({
            room_id,
            sender_id,
            text,
        });
        let message = await new_message.save();

        res.status(200).json(message);
    } catch (err) {
        res.status(500).json(err);
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { room_id } = req.params;
        let messages = await messagesModel.find({
            room_id
        });

        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
};