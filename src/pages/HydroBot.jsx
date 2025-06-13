import { useState } from "react";
import { Send, User } from "lucide-react";
import botLogo from "../assets/icons/hydrobot.png";

export default function HydroBotChat() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello, How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    // Simuler une réponse du bot
    setTimeout(() => {
      const botReply = {
        from: "bot",
        text: "I'm analyzing the salinity data... Please wait.",
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="flex flex-col h-full w-full bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#003366] text-white font-semibold text-lg px-6 py-3 flex items-center gap-2">
        <img src={botLogo} alt="HydroBot" className="w-6 h-6" />
        HydroBot
      </div>

      {/* Chat body */}
      <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto bg-blue-50">
        {messages.map((msg, index) => (
          <div
  key={index}
  className={`w-full flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
>
  <div
  className={`flex items-start gap-2  max-w-[60%] ${
    msg.from === "user" ? "flex-row-reverse" : ""
  }`}
>

    {/* Avatar */}
    <div className="w-6 h-6 shrink-0 rounded-full mt-1 bg-blue-400 text-white flex items-center justify-center">
      {msg.from === "user" ? (
        <User className="w-4 h-4" />
      ) : (
        <img src={botLogo} alt="HydroBot" className="w-5 h-5" />
      )}
    </div>

    {/* Bubble */}
    <div className="relative">
      <div
        className={`px-4 py-2 rounded-lg text-sm ${
          msg.from === "user"
            ? "bg-blue-400 text-white rounded-br-none"
            : "bg-white text-gray-800 shadow rounded-bl-none"
        }`}
      >
        {msg.text}
      </div>

      {/* Flèche */}
      <div
        className={`absolute top-2 w-0 h-0 border-t-8 border-b-8 ${
          msg.from === "user"
            ? "right-[-8px] border-l-8 border-l-blue-400 border-t-transparent border-b-transparent"
            : "left-[-8px] border-r-8 border-r-white border-t-transparent border-b-transparent"
        }`}
      />
    </div>
  </div>
</div>

        ))}
      </div>

      {/* Input */}
      <div className=" px-4 py-3 flex items-center bg-white">
        <input
          type="text"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-sm"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
