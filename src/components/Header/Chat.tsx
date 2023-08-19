import React from "react";
// import { Link } from "react-router-dom";
import "../../components/Header/chat.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TypingAnimation from "./components/TypingAnimation";
import chatBubble from "../../assets/chatbubble.svg";
import { extractContentFromDOM } from "../../services/domExtraction";

interface ChatLogItem {
  type: string;
  message: string;
}

interface ChatDropDownProps {
  showChat: boolean;
  setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const Chat: React.FC<ChatDropDownProps> = ({ showChat, setShowChat }) => {
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState<ChatLogItem[]>([]); // Specify the type as ChatLogItem[]
  const [isLoading, setIsLoading] = useState(false);
  const suggestionPrompts = [
    "Tell me about treatment options.",
    "What are the common side effects?",
    "How to manage medication schedule?",
  ];
  const [pageContent, setPageContent] = useState('');

  const systemMessage = {
    role: "system",
    content: "You are a bot please keep conversation going.",
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const content = extractContentFromDOM();
      setPageContent(content);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    const extractedContent = extractContentFromDOM();
    setPageContent(extractedContent);
  }, []);

  useEffect(() => {
    const chatContainer = document.getElementById("chat_container");
    if (chatContainer && showChat) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [showChat, chatLog]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newMessage = {
      message: inputValue,
      type: "user",
    };

    const newMessages = [...chatLog, newMessage];

    setChatLog(newMessages);

    sendMessage(newMessages);

    setInputValue("");
  };

  const sendMessage = (message: ChatLogItem[]) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const url = `${baseUrl}/chatgpt`;

    const apiMessages = message.map((messageObject) => {
      let role = "";
      if (messageObject.type === "user") {
        role = "user";
      } else {
        role = "assistant";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      prompt: [systemMessage, ...apiMessages],
    };

    setIsLoading(true);

    axios
      .post(url, apiRequestBody)
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
        className={`fixed bottom-0 right-0 rounded md:bottom-3 md:right-4 ${
          showChat ? "show_chat border-1bg-white ring-slate-1000/10" : "h-12 "
        } shadow transition-all`}
      >
        {showChat ? (
          <div
            id="chat_container"
            className=" mx-auto flex h-full  flex-col overflow-auto rounded "
          >
            <div
              className="absolute mt-0 flex h-8 w-full flex-row items-center justify-between rounded-t-lg border-b bg-white p-1  "
              style={{ borderBottomColor: "#abcdef" }}
            >
              <div className=" ml-4 text-black">
                Welcome to Balancer! <br />
              </div>
              <div
                className="delete mr-2 flex h-6 w-8 cursor-pointer items-center justify-center rounded-full bg-white text-black hover:bg-red-500"
                onClick={() => setShowChat(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.293 4.293a1 1 0 011.414 1.414L11.414 12l5.293 5.293a1 1 0 01-1.414 1.414L10 13.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 12 3.293 6.707a1 1 0 111.414-1.414L10 10.586l5.293-5.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-6 flex flex-grow flex-col space-y-2 p-5 pb-44">
              {chatLog.length === 0 ? (
                <div className="text-gray-500">
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
                          : "border-2 bg-gray-200 text-black "
                      }rounded-lg max-h-[100%] max-w-[500px] p-2`}
                    >
                      {message.message}
                    </div>
                  </div>
                ))
              )}
              {isLoading && (
                <div key={chatLog.length} className="flex justify-between">
                  <div className="max-w-sm rounded-lg p-4 text-white">
                    <TypingAnimation />
                  </div>
                </div>
              )}
            </div>

            <div className="inside_chat absolute bottom-0 left-0 right-0 rounded-b-lg bg-white p-4">
              <div className="flex  space-x-2 p-2 ">
                {suggestionPrompts.map((suggestion, index) => (
                  <button
                    type="button"
                    key={index}
                    className="rounded-md border p-2 text-sm text-black hover:bg-blue-200"
                    onClick={() => setInputValue(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="mb-1 flex">
                <div className="ml-2 flex-grow">
                  <input
                    type="text"
                    className="input_chat ring-slate-1000/10 dark:highlight-white/5 text-sm"
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
        ) : (
          <div
            onClick={() => setShowChat(true)}
            className="  absolute bottom-9 right-5 h-6 w-6 cursor-pointer rounded-full object-contain  hover:cursor-pointer hover:border-b-2 hover:border-blue-600 hover:bg-gray-200 md:bottom-20 md:right-20 "
          >
            <img src={chatBubble} alt="logo" className="   " />
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
