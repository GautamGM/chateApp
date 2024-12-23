import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton, Button, Typography } from "@mui/material";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import CallIcon from "@mui/icons-material/Call";
import InfoIcon from "@mui/icons-material/Info";
import PhotoIcon from "@mui/icons-material/Photo";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/configFire/config";
function UserChate() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! How can I help you?", sender: "receiver", time: "10:00 AM" },
    { id: 2, text: "I need some help with my project.", sender: "sender", time: "10:02 AM" },
    { id: 3, text: "Sure, what do you need?", sender: "receiver", time: "10:05 AM" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([
      ...messages,
      { id: messages.length + 1, text: newMessage, sender: "sender", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setNewMessage("");
    setOpen(false)
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage((prev) => prev + emoji.emoji);
   
  };

// getting the chat in the function
useEffect(()=>{
const unSub=onSnapshot(doc(db,"chats","V9q1UerwkJ9K2UZv8WdX"),(res)=>{
  console.log(res.data(),"chate data in cahta component")
})

return ()=>{
  unSub()
}
},[])


const endRef=useRef()
useEffect(()=>{
  endRef.current?.scrollIntoView({ behavior: "smooth" });
},[messages])
  return (
    <div className="flex flex-col border-r-2 border-l-2 ">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-transparent text-white">
        <div className="flex items-center">
          <img
            src="https://imgs.search.brave.com/47K5YaAVPJL5FyZkNlOZ3NkQVxz88pDJ_aXG1IUBZo4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvQkQ0/NjgzLTAwMS9waG90/by9jcmFzaC10ZXN0/LWR1bW15LXNpdHRp/bmctb24tZ2FyZGVu/LWNoYWlyLWhvbGRp/bmctZHJpbmsuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU15/VUJrZHdiN3g5Zk1J/NFZkSkgzLVpYd1Jj/cVVFT2wyX0tnSWxX/M3hkZUU9"
            alt="Profile"
            className="h-12 w-12 rounded-full border-2 border-white"
          />
          <p className="pl-3">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className="flex space-x-3">
          <IconButton sx={{ color: "white" }}>
            <VideoChatIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <CallIcon />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <InfoIcon />
          </IconButton>
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex-1 overflow-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-center mb-4 break-words max-w-[600px] min-h-[100px] ${
              message.sender === "sender" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "receiver" && (
              <img
                src="https://imgs.search.brave.com/wBWfZUT95-Ahpbk2PP-Gppng_grcBCWFk1ea6rXmhUE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk9HTmhPVGcx/WTJVdFpEZzNaUzAw/TWpObUxUazRNR010/TUdFNFpEYzJNalJq/TkRrMFhrRXlYa0Zx/Y0djQC5qcGc"
                alt="Receiver"
                className="h-10 w-10 rounded-full border-2 border-gray-300 mr-3"
              />
            )}
            <div
              className={`p-3 rounded-lg max-w-[70%] text-white ${
                message.sender === "sender" ? "bg-blue-500" : "bg-gray-400"
              }`}
            >
              <Typography>{message.text}</Typography>
              <Typography className="text-xs text-gray-200 mt-1 text-right">{message.time}</Typography>
            </div>
            {message.sender === "sender" && (
              <img
                src="https://imgs.search.brave.com/47K5YaAVPJL5FyZkNlOZ3NkQVxz88pDJ_aXG1IUBZo4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvQkQ0/NjgzLTAwMS9waG90/by9jcmFzaC10ZXN0/LWR1bW15LXNpdHRp/bmctb24tZ2FyZGVu/LWNoYWlyLWhvbGRp/bmctZHJpbmsuanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPU15/VUJrZHdiN3g5Zk1J/NFZkSkgzLVpYd1Jj/cVVFT2wyX0tnSWxX/M3hkZUU9"
                alt="Sender"
                className="h-10 w-10 rounded-full border-2 border-gray-300 ml-3"
              />
            )}
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {/* Input Section */}
      <div className="p-4 flex items-center">
        <IconButton>
          <PhotoIcon sx={{color:"white"}} />
        </IconButton>
        <IconButton>
          <MicIcon sx={{color:"white"}} />
        </IconButton>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mx-4 h-[50px] overflow-auto w-[40px] text-black p-2 border rounded-lg focus:outline-none"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          endIcon={<SendIcon />}
        >
          Send
        </Button>
        <div className="relative">
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            <SentimentSatisfiedAltIcon sx={{color:"yellow"}} />
          </IconButton>
          {open && (
            <div className="absolute bottom-10 left-0 z-50 rounded-lg">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserChate;
