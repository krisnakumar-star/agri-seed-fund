import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Send,
  ArrowLeft,
  Phone,
  Video,
  MoreVertical,
  Languages,
  Smile,
  Paperclip,
  Check,
  CheckCheck,
} from "lucide-react";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [messages, setMessages] = useState([
    {
      sender: "owner",
      text: "Hello! Thanks for showing interest in my land.",
      time: "10:15 AM",
      status: "seen",
    },
    {
      sender: "user",
      text: "Hi, can you tell me more about the water facilities?",
      time: "10:16 AM",
      status: "delivered",
    },
    {
      sender: "owner",
      text: "Yes, borewell and canal access are available.",
      time: "10:17 AM",
      status: "sent",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    setMessages([
      ...messages,
      { sender: "user", text: newMessage, time: "Now", status: "sent" },
    ]);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-100 via-white to-green-200 relative overflow-hidden">
      {/* Animated Background Layers */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-green-300 via-transparent to-green-100 opacity-30"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-40 left-20 w-96 h-96 bg-green-400 rounded-full opacity-20 blur-3xl"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500 rounded-full opacity-20 blur-3xl"
        animate={{ x: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />

      {/* Sidebar with Land Info */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex flex-col w-72 bg-white/80 backdrop-blur-lg border-r shadow-2xl z-10"
      >
        <div className="p-5 border-b bg-green-600 text-white rounded-tr-xl">
          <h2 className="text-xl font-bold">Land #{id}</h2>
          <p className="text-sm opacity-80">Owner: Ramesh Kumar</p>
        </div>
        <div className="p-5 space-y-4 text-gray-700">
          <p>📍 Location: Tamil Nadu</p>
          <p>🌾 Size: 5 Acres</p>
          <p>💧 Water: Borewell, Canal</p>
          <Button className="w-full bg-green-600 hover:bg-green-700 transition">
            View Details
          </Button>
        </div>
      </motion.div>

      {/* Main Chat Section */}
      <div className="flex flex-col flex-1 bg-white/60 backdrop-blur-xl rounded-l-2xl shadow-2xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between bg-green-600 text-white p-4 shadow-md"
        >
          <div className="flex items-center gap-3">
            <ArrowLeft
              className="cursor-pointer hover:text-gray-200"
              onClick={() => navigate(-1)}
            />
            <motion.img
              src="/assets/owner-avatar.png"
              alt="Owner"
              className="w-12 h-12 rounded-full border-2 border-white shadow-md"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div>
              <h2 className="font-bold text-lg">Land Owner</h2>
              <motion.p
                className="text-xs flex items-center gap-1"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🟢 Online
              </motion.p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Languages
              className={`cursor-pointer ${
                isTranslating ? "text-yellow-300" : "hover:text-gray-200"
              }`}
              onClick={() => setIsTranslating(!isTranslating)}
            />
            <Phone className="cursor-pointer hover:text-gray-200" />
            <Video className="cursor-pointer hover:text-gray-200" />
            <MoreVertical className="cursor-pointer hover:text-gray-200" />
          </div>
        </motion.div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className={`p-4 rounded-2xl max-w-sm shadow-md relative ${
                    msg.sender === "user"
                      ? "bg-gradient-to-br from-green-500 to-green-700 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] opacity-70">{msg.time}</span>
                    {msg.sender === "user" && (
                      <span className="text-[10px] opacity-80">
                        {msg.status === "seen" ? (
                          <CheckCheck className="inline w-3 h-3 text-blue-400" />
                        ) : msg.status === "delivered" ? (
                          <CheckCheck className="inline w-3 h-3 text-gray-400" />
                        ) : (
                          <Check className="inline w-3 h-3 text-gray-400" />
                        )}
                      </span>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing animation */}
          {newMessage && (
            <div className="flex justify-start gap-2 items-center">
              <motion.div
                className="flex space-x-1 bg-gray-200 px-3 py-2 rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    className="w-2 h-2 bg-gray-500 rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: dot * 0.2,
                    }}
                  />
                ))}
              </motion.div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="p-4 bg-white/70 backdrop-blur-md flex items-center gap-3 shadow-xl"
        >
          <Smile className="text-gray-500 cursor-pointer hover:text-green-600" />
          <Paperclip className="text-gray-500 cursor-pointer hover:text-green-600" />
          <motion.input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            whileFocus={{ scale: 1.02 }}
          />
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              onClick={sendMessage}
              className="rounded-full p-3 bg-green-600 hover:bg-green-700 shadow-md"
            >
              <Send className="h-5 w-5 text-white" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
