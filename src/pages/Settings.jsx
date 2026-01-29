import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const { theme, setTheme } = useTheme();

  function buttonStyle(value) {
    return `p-3 border rounded-lg ${
      theme === value
        ? "border-blue-500"
        : "border-gray-300 dark:border-neutral-700"
    }`;
  }

  return (
    <div className="p-6 space-y-4 bg-white dark:bg-neutral-900 text-black dark:text-white">
      <h1 className="text-xl font-semibold">Theme</h1>

      <button onClick={() => setTheme("light")} className={buttonStyle("light")}>
        Light
      </button>

      <button onClick={() => setTheme("dark")} className={buttonStyle("dark")}>
        Dark
      </button>

      <button onClick={() => setTheme("system")} className={buttonStyle("system")}>
        System
      </button>
    </div>
  );
}