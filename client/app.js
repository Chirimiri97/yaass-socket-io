Vue.createApp({
    
    data() {
        return {
            user_name: "",
            message: "",
            room_name: "",
            messages: [],
            socket: io("ws://localhost:3000")
        }
    },

    computed: {
        disableSendButton() {
            if (this.message && this.user_name) {
                return false;
            }

            return true;
        }
    },
    async mounted() {
        this.socket.on("message", (text) => {
            this.messages.push(text);
        });

        this.socket.emit("get-public-messages");

        this.socket.on("get-public-messages", (data) => {
            this.messages = data;
        });

        this.socket.on("join-room", (data) => {
            this.messages = data;
        });
    },

    methods: {
        sendMessage() {
            this.socket.emit("message", { message: this.message, id: this.socket.id, user_name: this.user_name, room_name: this.room_name });
            this.message = "";

            if (this.room_name) {
                this.socket.emit("join-room", this.room_name);
            } else {
                this.socket.emit("get-public-messages");
            }
        },
        joinRoom() {
            console.log(this.room_name);
            this.socket.emit("join-room", this.room_name);
        }
    }
}).mount("#app");