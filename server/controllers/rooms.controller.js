const roomsModel = require("../models/rooms.model");

// Create Room.
exports.createRoom = async (req, res) => {
    try {
        let new_room = new roomsModel({
            members: [req.body.sender_id, req.body.receiver_id],
        });

        let room = await new_room.save();

        res.status(200).json(room);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Get rooms for user.
exports.getRooms = async (req, res) => {
    try {
        let rooms = await roomsModel.find({
            members: { $in: [req.params.user_id] },
        });

        res.status(200).json(rooms);
    } catch (err) {
        res.status(500).json(err);
    }
};

// Find specific room.
exports.findRoom = async (req, res) => {
    try {
        let room = await roomsModel.findOne({
            members: { $all: [req.params.first_id, req.params.second_id] }
        });

        res.status(200).json(room);
    } catch (err) {
        res.status(500).json(err);
    }
};