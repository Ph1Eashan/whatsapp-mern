import { useEffect, useState } from "react";
import "./App.css";
import Chats from "./component/Chats";
import Sidebar from "./component/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./component/HomePage";
import Login from "./component/Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();
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
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app-body">
          <Router>
            <Sidebar />
            <Routes>
              <Route
                exact
                path="/rooms/:roomId"
                element={<Chats messages={messages} />}
              >
                {/* <Sidebar />
              <Chats messages={messages} /> */}
              </Route>
            </Routes>
            <Routes>
              <Route path="/"></Route>
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
