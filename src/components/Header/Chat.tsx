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
  const suggestionPrompts = [
    "Tell me about treatment options.",
    "What are the common side effects?",
    "How to manage medication schedule?",
  ];

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
          showChat
            ? "w-[25%] h-[50%]  bg-white border-1bg-white ring-1 ring-slate-1000/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
            : "h-12 "
        } transition-all shadow`}
      >
        {showChat && (
          <div
            id="chat_container"
            className=" overflow-auto mx-auto  flex flex-col h-full "
          >
            <div className="flex flex-col space-y-2 pb-40 p-5 flex-grow">
              {chatLog.length === 0 ? (
                <div className="text-gray-500">
                  Welcome to Balancer! <br />
                  <br />
                  Balancer is a powerful open-source tool available for free
                  use. Simply start typing your questions or concerns, and we'll
                  do our best to assist you. <br />
                  <br />
                  {/* <br />
                  <br /> Balancer is an assistive tool and cannot be used as a replacement for a real human prescriber. */}
                </div>
              ) : (
                chatLog.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        message.type === "user"
                          ? "bg-blue-200 text-black "
                          : "text-black bg-gray-200 border-2 "
                      }rounded-lg p-2 max-h-[100%] max-w-[500px]`}
                    >
                      {message.message}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-between">
                  <div className="rounded-lg p-4 text-white max-w-sm">
                    <TypingAnimation />
                  </div>
                </div>
              )}
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-2 border-t">
              <div className=" space-x-2  p-2 flex ">
                {suggestionPrompts.map((suggestion, index) => (
                  <button
                    type="button"
                    key={index}
                    className="rounded-md border  hover:bg-blue-200 p-2"
                    onClick={() => setInputValue(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex">
                <div className="flex-grow ml-2">
                  <input
                    type="text"
                    className="pl-3 py-2 px-2 w-full font-semibold placeholder-gray-500 text-black  bg-white ring-1 ring-slate-1000/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg  text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
                    placeholder="Talk to me..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
                <div className="ml-5">
                  <button type="submit" className="btn">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
