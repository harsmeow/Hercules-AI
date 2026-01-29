import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useChat } from "../context/ChatContext";
import { useEffect, useRef, useState } from "react";

export default function AppLayout() {
  const {
    chats,
    activeChatId,
    setActiveChatId,
    createChat,
    deleteChat,
    exportChat,
  } = useChat();

  const location = useLocation();
  const navigate = useNavigate();
  const [menuId, setMenuId] = useState(null);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuId(null);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="flex h-screen bg-white dark:bg-neutral-900 text-black dark:text-white">

      <aside className="w-64 border-r dark:border-neutral-700 flex flex-col p-4">
        
        <h1 className="text-xl font-semibold mb-6">
          Hercules AI
        </h1>

        <button
          onClick={() => {
            createChat();
            navigate("/");
          }}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          + New Chat
        </button>

        <div className="flex-1 space-y-1 overflow-y-auto">
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`relative flex items-center justify-between p-2 rounded cursor-pointer ${
                chat.id === activeChatId
                  ? "bg-gray-200 dark:bg-neutral-700"
                  : "hover:bg-gray-100 dark:hover:bg-neutral-800"
              }`}
            >
              <span
                className="flex-1"
                onClick={() => {
                  setActiveChatId(chat.id);
                  navigate("/");
                }}
              >
                {chat.title}
              </span>

              <button
                onClick={e => {
                  e.stopPropagation();
                  setMenuId(menuId === chat.id ? null : chat.id);
                }}
                className="px-2 text-lg"
              >
                ⋮
              </button>

              {menuId === chat.id && (
                <div
                  ref={menuRef}
                  className="absolute right-2 top-10 w-32 bg-white dark:bg-neutral-800 border dark:border-neutral-700 rounded shadow-md flex flex-col z-50"
                >
                  <button
                    onClick={() => {
                      exportChat(chat.id);
                      setMenuId(null);
                    }}
                    className="px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-neutral-700"
                  >
                    Export
                  </button>
                  <button
                    onClick={() => {
                      deleteChat(chat.id);
                      setMenuId(null);
                    }}
                    className="px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-neutral-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t dark:border-neutral-700 space-y-2">
          <button
            onClick={() =>
              navigate(
                location.pathname === "/settings" ? "/" : "/settings"
              )
            }
            className="w-full text-left px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            {location.pathname === "/settings" ? "Chat" : "Settings"}
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
