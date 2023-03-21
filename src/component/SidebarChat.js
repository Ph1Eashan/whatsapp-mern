import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../firebase";
import "./SidebarChat.css";

function SidebarChat({ addNewChat, id, name }) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://api.dicebear.com/5.x/adventurer/svg?seed=${seed}`}
        />
        <div className="sidebarChat-info">
          <h2>{name}</h2>
          <p>This is the last message</p>
        </div>
      </div>
    </Link>
  ) : (
    <div>
      <div onClick={createChat} className="sidebarChat">
        <h2>Add new Chat</h2>
      </div>
    </div>
  );
}

export default SidebarChat;
