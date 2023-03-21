import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import axios from "../axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import db from "../firebase";

function Chats({ messages }) {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessage(snapshot.doc.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      name: "Demo",
      message: input,
      timestamp: moment().format("D MMM YY, h:mm:ss a"),
      received: true,
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar
          src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${seed}`}
        />
        <div className="chat-headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat-body">
        {messages.map((message) => (
          <p className={`chat-message ${message.received && "chat-receiver"}`}>
            <span className="chat-name">{message.name}</span>
            {message.message}
            <span className="chat-timestamp">{message.timestamp}</span>
          </p>
        ))}
        {/* <p className="chat-message chat-receiver">
          <span className="chat-name">Eashan</span>
          This is a message
          <span className="chat-timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat-message">
          <span className="chat-name">Eashan</span>
          This is a message
          <span className="chat-timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>
      <div className="chat-footer">
        <InsertEmoticon />
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chats;
