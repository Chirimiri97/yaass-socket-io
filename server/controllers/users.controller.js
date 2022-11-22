const usersModel = require("../models/users.model");

// Create user.
exports.createUser = async (req, res) => {
    try {
        let new_user = new usersModel(req.body);
        let user = await new_user.save();

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};