const messagesModel = require("../models/messages.model");
const roomsModel = require("../models/rooms.model");



exports.getPublicMessages = async () => {
    try {
        let result = await messagesModel.find(
            {
                $or: [
                    { room_name: { $exists: false } },
                    { room_name: "" }
                ]
            }
        );
        return result;
    } catch (err) {
        return err;
    }
};

exports.getRoomMessages = async (room_name) => {
    try {
        let result = await messagesModel.find(
            {
                room_name: room_name,
            }
        );

        return result;
    } catch (err) {
    }
}

exports.saveMessage = async (message) => {
    try {
        let newMessage = new messagesModel(message);
        await newMessage.save();
    } catch (err) {
        return err;
    }
};

exports.addRoom = async (room_name) => {
    try {
        let result = await roomsModel.findOneAndUpdate(
            { room_name, },
            { $set: { room_name } },
            { upsert: true, new: true },
        );

        return result;
    } catch (err) {
        return null;
    }
};