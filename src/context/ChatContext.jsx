import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState(() =>
    JSON.parse(localStorage.getItem("chats")) || []
  );

  const [activeChatId, setActiveChatId] = useState(
    localStorage.getItem("activeChatId")
  );

  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats));
  }, [chats]);

  useEffect(() => {
    if (activeChatId) localStorage.setItem("activeChatId", activeChatId);
  }, [activeChatId]);

  function createChat() {
    const chat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };
    setChats(prev => [chat, ...prev]);
    setActiveChatId(chat.id);
  }

  function updateMessages(id, messages) {
    setChats(prev =>
      prev.map(c => {
        if (c.id !== id) return c;

        if (
          c.title === "New Chat" &&
          messages.length === 1 &&
          messages[0].role === "user"
        ) {
          const words = messages[0].content.trim().split(/\s+/);
          const slicedWords = words.slice(0, 5);
          let newTitle = slicedWords.join(" ");
          
          if (words.length > 5) {
            newTitle += "...";
          }
          
          return { ...c, messages, title: newTitle };
        }

        return { ...c, messages };
      })
    );
  }

  function deleteChat(id) {
    setChats(prev => prev.filter(c => c.id !== id));
    if (id === activeChatId) setActiveChatId(null);
  }

  function exportChat(id) {
    const chat = chats.find(c => c.id === id);
    if (!chat) return;

    const text = chat.messages
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n\n");

    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "chat.txt";
    link.click();
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        activeChatId,
        setActiveChatId,
        activeChat: chats.find(c => c.id === activeChatId),
        createChat,
        updateMessages,
        deleteChat,
        exportChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext);
