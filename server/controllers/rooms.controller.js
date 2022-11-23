const roomsModel = require("../models/rooms.model");
const usersModel = require("../models/users.model");
const awaitEach = require("await-each");

// Create Room.
exports.createRoom = async (data) => {
	try {
		const { sender_id, receiver_id } = data;

		let find_room = await roomsModel.findOne({
			members: { $all: [sender_id, receiver_id] },
		});

		if (find_room) {
			return null;
		}

		let new_room = new roomsModel({
			members: [sender_id, receiver_id],
		});

		let room = await new_room.save();

		return room;
	} catch (err) {
		throw new Error(err);
	}
};

// Get rooms for user.
exports.getRooms = async (user_id) => {
	try {
		let result = await roomsModel.aggregate([
			{
				$match: { members: { $in: [user_id] } },
			},
			{
				$unwind: "$members",
			}
		]);
		result = result.filter(el => el["members"] != user_id);
        
        let rooms = await awaitEach(result, async (el) => {
            let user = await usersModel.findOne({
                _id: el.members
            });

            el.user = user;

            return el;
        });

        console.log(rooms);

		return rooms;
	} catch (err) {
		console.log(err.message);
		throw new Error(err);
	}
};

// Find specific room.
exports.findRoom = async (data) => {
	try {
		const { first_id, second_id } = data;
		let room = await roomsModel
			.findOne({
				members: { $all: [first_id, second_id] },
			})
			.sort({ _id: 1 });

		return room;
	} catch (err) {
		throw new Error(err);
	}
};
