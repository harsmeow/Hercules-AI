import { useEffect, useRef, useState } from "react";
import { useChat } from "../context/ChatContext";
import { fakeChatApi } from "../services/fakeChatApi";

export default function Chat() {
  const { activeChat, updateMessages } = useChat();
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const textareaRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat?.messages, isTyping]);

  useEffect(() => {
    function handleGlobalKeyDown(e) {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (document.activeElement === textarea) return;

      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (e.key.length !== 1 && e.key !== "Enter") return;

      textarea.focus();
    }

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  if (!activeChat) {
    return <div className="flex items-center justify-center h-screen text-xl">Start a new chat</div>;
  }

  async function sendMessage() {
    if (!input.trim() || isTyping) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    const updatedMessages = [...activeChat.messages, userMessage];

    updateMessages(activeChat.id, updatedMessages);
    setInput("");
    setIsTyping(true);

    setTimeout(async () => {
      const reply = await fakeChatApi(userMessage.content);

      updateMessages(activeChat.id, [
        ...updatedMessages,
        { role: "assistant", content: reply },
      ]);

      setIsTyping(false);
    }, 900);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="h-full flex flex-col p-4">

      <div className="flex-1 overflow-y-auto space-y-3">
        {activeChat.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md px-4 py-2 rounded-xl text-sm ${
                msg.role === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-neutral-700 dark:text-white"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-neutral-700 text-sm animate-pulse">
              AI is typing...
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <textarea
        ref={textareaRef}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="border p-3 rounded-xl mt-3 focus:outline-none dark:bg-neutral-800 dark:text-white"
        rows={2}
      />
    </div>
  );
}
