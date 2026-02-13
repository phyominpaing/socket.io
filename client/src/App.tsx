import { nanoid } from "nanoid";
import { useEffect, useState, type FormEvent } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");
const userName = nanoid(4);
// const avatar = "https://avatar.iran.liara.run/public";

type Message = {
  message: string;
  userName: string;
};

const App = () => {
  const [message, setMessage] = useState("");
  const [groupMessages, setGroupMessages] = useState<Message[]>([]);

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    if(!message) return;
    socket.emit("send message", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("Join Noti", ({ message, userName }: Message) => {
      const username = userName ? userName : "Anonymous";
      setGroupMessages((prev) => [...prev, { message, userName: username }]);
    });

    socket.on("send message", ({ message, userName }: Message) => {
      setGroupMessages((prev) => [...prev, { message, userName }]);
    });

    socket.on("Leave Noti", ({ message , userName }: Message) => {
      const username = userName ? userName : "Anonymous";
      setGroupMessages((prev) => [...prev, { message, userName: username }]);
    });
  }, []);

  return (
    <div>
      <div>
        {groupMessages.map((msg , index) => (
          <div key={index}>
            <p>{msg.userName} - {msg.message}</p>
            
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} action="">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a messge"
        />
        <button type="submit">Send</button>
      </form>
      
    </div>
  );
};

export default App;
