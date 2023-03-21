import axios from "../axios";
import React, { useEffect, useState } from "react";
import Chats from "./Chats";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";

const HomePage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    //once
    const pusher = new Pusher("5012ead5e84cb263d977", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      // alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);
  return (
    <>
      <Sidebar />
      <Chats messages={messages} />
    </>
  );
};

export default HomePage;
