# Hercules AI

A simple and clean AI chat interface built with React.

## Features & How They Work

### 1. Smart Chat Titles
* **How it works:** When you start a chat, the app takes the first **5 words** of your first message and makes it the title. 
* **The "Clean" Look:** If you type one extremely long word, the sidebar automatically adds "..." so it never breaks the layout or creates ugly scrollbars.

### 2. Dark & Light Mode
* **How it works:** You can switch between Light, Dark, or System themes in the Settings. 
* **Memory:** The app remembers your choice. If you pick Dark mode, it will stay dark even if you refresh the page.

### 3. Persistent History
* **How it works:** Your chats are saved to your browser's **Local Storage**. This means you can close the browser and come back later, and your conversations will still be there.

### 4. Export & Delete
* **How it works:** Click the three dots (⋮) on any chat to:
    * **Export:** Download your chat as a `.txt` file to your computer.
    * **Delete:** Remove the chat forever.

### 5. Fast Navigation
* **How it works:** Uses "React Router" to switch between the Chat page and Settings page instantly without the screen flickering or reloading.

## How to Run it Locally

1. **Install:** Run `npm install` to get the necessary files.
2. **Start:** Run `npm run dev` to open the app in your browser.

## Tech Used
* **React** (The Logic)
* **Tailwind CSS** (The Design)
* **React Router** (Moving between pages)
