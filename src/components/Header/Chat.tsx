import React from "react";
import { Link } from "react-router-dom";
import "../../components/Header/chat.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TypingAnimation from "./components/typinganimation";

interface ChatLogItem {
  type: string;
  message: string;
}

interface ChatDropDownProps {
  showChat: boolean;
  handleChat: () => void;
}

const Chat: React.FC<ChatDropDownProps> = ({ showChat, handleChat }) => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState<ChatLogItem[]>([]); // Specify the type as ChatLogItem[]
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const chatContainer = document.getElementById("chat_container");
    if (chatContainer && showChat) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [showChat, chatLog]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendMessage(inputValue);

    setInputValue("");
  };

  const sendMessage = (message: string) => {
    const url = "http://localhost:3001/chatgpt";

    const data = {
      // model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: message }],
    };
    console.log(data);

    setIsLoading(true);

    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        setChatLog((prevChatLog) => [
          ...prevChatLog,
          {
            type: "bot",
            message: response.data.message.choices[0].message.content,
          },
        ]);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  return (
    <>
      {/* {showChat && (
        <div
          className="fixed inset-0 bg-gray-900 opacity-50 z-5"
          onClick={handleChat}
        ></div>
      )} */}
      <div
        className={`fixed bottom-4 right-4 rounded ${
          showChat ? "w-100 h-80  border-2 bg-white dark:bg-black" : "h-12 "
        } transition-all shadow`}
      >
        {showChat && (
          <div
            id="chat_container"
            className="h-full overflow-auto mx-auto container overscroll-none"
          >
            <div className="flex flex-col h-screen ">
              <div className="flex-grow p-3 ">
                <div className="flex flex-col space-y-2">
                  {chatLog.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`${
                          message.type === "user"
                            ? "bg-blue-200 text-black "
                            : " text-black border-2 "
                        } rounded-lg p-2  max-w-[400px]`}
                      >
                        {message.message}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div key={chatLog.length} className="flex justify-between">
                      <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                        <TypingAnimation />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="  relative p-3  ">
                <form onSubmit={handleSubmit} className="">
                  <div className="">
                    <input
                      type="text"
                      className="pl-3  py-2 px-28 font-semibold border-none placeholder-gray-500 text-black rounded-2xl ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
                      placeholder="Talk to me..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                  <div className="mr-5">
                    <button
                      type="submit"
                      className="bg-blue-500 rounded-2xl px-4 py-2 text-white font-semibold focus:outline-none hover:text-black transition-colors duration-300 absolute top-1/2 transform -translate-y-1/2 right-2"
                    >
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
