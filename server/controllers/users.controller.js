const usersModel = require("../models/users.model");
const roomsModel = require("../models/rooms.model");

// Create user.
exports.createUser = async (data) => {
    try {
        let new_user = new usersModel(data);
        let user = await new_user.save();

        return user;
    } catch (err) {
        throw new Error("Error");
    }
};

exports.getAllUsers = async (user_id) => {
    try {
        let result = await usersModel.find({
            _id: { $ne: user_id },
        });

        // let result = await rooms.find({
        //     members: { $all: [] }
        // })

        return result;
    } catch (err) {
        throw new Error("Error");
    }
};

exports.getUserByEmailId = async (email_id) => {
    try {
        let user = usersModel.findOne({
            email_id,
        });

        return user;
    } catch (err) {
        throw new Error(err);
    }
};