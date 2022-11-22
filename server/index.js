const server = require("http").createServer();
const io = require("socket.io")(server, {
	cors: { origin: "*" },
});

require("dotenv").config();
const mongoose = require("mongoose");

const connection_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@sandbox.lsxn8.mongodb.net/${process.env.DB_NAME}`;

const allInOneController = require("./controllers/all-in-one.controller");

const connection = mongoose
	.connect(connection_uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => {
		io.on("connection", (socket) => {
			// Listen for message.
			socket.on("message", async (message) => {
				try {
					await allInOneController.saveMessage(message);
					io.emit("message", message);
				} catch (err) {}
			});

			// Get all the rooms.
			socket.on("get-public-messages", async () => {
				try {
					let result = await allInOneController.getPublicMessages();
					io.emit("get-public-messages", result);
				} catch (err) {
					io.emit("get-public-messages", []);
				}
			});

			// Add new room.
			socket.on("add-room", async (room_name) => {
				try {
					let room = await allInOneController.addRoom(room_name);
					io.emit("join-room", room._id);
				} catch (err) {

				}
			});

			// JOIN ROOM. Get all the chats in the room.
			socket.on("join-room", async (room_name) => {
				try {
					let result = await allInOneController.getRoomMessages(
						room_name
					);
					io.emit("join-room", result);
				} catch (err) {
                    console.log(err.message);
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
