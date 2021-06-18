require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const SocketServer = require("./socketServer");
const { ExpressPeerServer } = require("peer");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieparser());

//Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});
//Create PeerServer
ExpressPeerServer(http, { path: "/" });

//Routes
app.use("/api", require("./routes/authRouter"));
app.use("/api", require("./routes/userRouter"));
app.use("/api", require("./routes/postRouter"));
app.use("/api", require("./routes/commentRouter"));
app.use("/api", require("./routes/notifyRouter"));
app.use("/api", require("./routes/messageRouter"));

const URL = process.env.MONGODB_URL || "";
mongoose.connect(
  URL,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err)
      console.log({
        message: "Error While connecting database ",
        error: err.message,
      });
    else console.log("Connected to mongoDb");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("notify/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "notify", "build", "index.html"));
  });
}
const port = process.env.PORT || 5000;
http.listen(port, () => {
  console.log(`server connected at port ${port}`);
});
