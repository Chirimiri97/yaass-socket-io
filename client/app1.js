Vue.createApp({
	data() {
		return {
            auth: false,
            login_state: true,
            user_name: "",
			email_id: "",
            user_data: {},
            all_users: [],
            add_user: "",
            all_rooms: [],
            room_id: "",
            room: {},
			message_text: "",
			all_messages: [],
			socket: io("ws://localhost:3000"),
		};
	},
	computed: {
        login() {
            return this.login_state;
        },
        notSignedIn() {
            return !this.auth;
        },
        disableLoginButton() {
            if (!this.email_id) {
                return true;
            }

            return false;
        },
        disableSignUpButton() {
            if (this.email_id && this.user_name) {
                return false;
            }

            return true;
        },
		disableSendButton() {
			if (this.message && this.user_name) {
				return false;
			}

			return true;
		},
	},
	mounted() {
        // Get a user.
        this.socket.on("user", (user) => {
            if (user) {
                this.auth = true;
                this.user_data = user;
                this.getAllUsers();
            }
        });

        // Add a user.
        this.socket.on("new-user-added", (user) => {
			if (user) {
                this.auth = true;
                this.user_data = user;
            }
		});

        // Get all users.
        this.socket.on("all-users", (data) => {
            if (data) {
                this.all_users = data;
            }
        });

		// Get all rooms.
        this.socket.on("all-rooms", (rooms) => {
            // console.log(rooms);
            this.all_rooms = rooms;
        });

        // Add Room.
        this.socket.on("room-added", (room) => {
            if (room) {
                this.all_rooms.push(room);
            } else {
                console.log("Room not added!");
            }
        });

        // Get messages.
        this.socket.on("messages", (messages) => {
            if (messages) {
                this.all_messages = messages;
            }
        });

        // Add message.
        this.socket.on("message", (message) => {
            if (message) {
                console.log(message.sender_id, this.user_data._id);
                if (message.sender_id == this.user_data._id) {
                    message.name = "You";
                } else {
                    message.name = this.room.user.user_name;
                }

                this.all_messages.push(message);
            }
        });

	},
	methods: {
        loginUser() {
            this.socket.emit("get-user", this.email_id);
        },
        signUpUser() {
            this.socket.emit("add-new-user", { email_id: this.email_id, user_name: this.user_name });
        },
        getAllUsers() {
            this.socket.emit("get-all-users", (this.user_data._id));

            this.getRooms();
        },
        addUser() {
            if (!this.add_user) {
                return;
            }

            this.socket.emit("add-room", { sender_id: this.user_data._id, receiver_id: this.add_user });
        },
        getRooms() {
            console.log("Calling this!");
            this.socket.emit("get-rooms", (this.user_data._id));
        },
        getMessages(room) {
            this.room_id = room._id;
            this.room = room;
            this.socket.emit("get-messages", (room._id));
        },
        sendMessage() {
            if (!this.user_data || !this.room_id) {
                return;
            }

			this.socket.emit("message", {
				text: this.message_text,
				sender_id: this.user_data._id,
                room_id: this.room_id,
			});
			this.message_text = "";
		},
	},
}).mount("#app");
