const messagesModel = require("../models/messages.model");

// Add message.
exports.addMessage = async (data) => {
    try {
        let { room_id, sender_id, text, sender_name  } = data;
        let new_message = new messagesModel({
            room_id,
            sender_id,
            text,
            sender_name,
        });
        let message = await new_message.save();

        return message;
    } catch (err) {
        return null;
    }
};

exports.getMessages = async (room_id) => {
    try {
        let messages = await messagesModel.find({
            room_id
        });

        return messages;
    } catch (err) {
        return null;
    }
};