const server = require("http").createServer();
const io = require("socket.io")(server, {
	cors: { origin: "*" },
});

require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("debug", true);

const connection_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@sandbox.lsxn8.mongodb.net/${process.env.DB_NAME}`;

const usersController = require("./controllers/users.controller");
const roomsController = require("./controllers/rooms.controller");
const messagesController = require("./controllers/messages.controller");

const connection = mongoose
	.connect(connection_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		io.on("connection", (socket) => {
			// Add new user.
			socket.on("add-new-user", async (data) => {
				try {
					let user = await usersController.createUser(data);
					io.emit("new-user-added", user);
				} catch (err) {
					// io.emit("new-user-added", null);
				}
			});

			// Get a user by Email ID.
			socket.on("get-user", async (email_id) => {
				try {
					let user = await usersController.getUserByEmailId(email_id);
					io.emit("user", user);
				} catch (err) {
					// io.emit("user", null);
				}
			});

			// Get all users.
			socket.on("get-all-users", async (user_id) => {
				try {
					let result = await usersController.getAllUsers(user_id);
					io.emit("all-users", result);
				} catch (err) {
					// io.emit("all-users", null);
				}
			});

			// Add new room.
			socket.on("add-room", async (data) => {
				try {
					let room = await roomsController.createRoom(data);
					io.emit("room-added", room);
				} catch (err) {
					// io.emit("room-added", null);
				}
			});

			// Get all rooms.
			socket.on("get-rooms", async (user_id) => {
				try {
					let rooms = await roomsController.getRooms(user_id);
					io.emit("all-rooms", rooms);
				} catch (err) {
					// io.emit("all-rooms", err);
				}
			});

			// Get messages.
			socket.on("get-messages", async (room_id) => {
				try {
					let messages = await messagesController.getMessages(
						room_id
					);
					io.emit("messages", messages);
				} catch (err) {}
			});

			// Add message.
			socket.on("message", async (data) => {
				try {
					let message = await messagesController.addMessage(data);
					io.emit("message", message);
				} catch (err) {
					// io.emit("message", null)
				}
			});
		});
		console.log("Mongoose - Connected to DB.");
	})
	.catch((err) => {
		console.log("Mongoose Error - ", err.message);
	});

server.listen(3000, () => {
	console.log("Server started on PORT 3000");
});
