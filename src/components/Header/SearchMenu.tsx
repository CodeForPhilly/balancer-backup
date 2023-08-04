import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
// import closeLogo from "../../assets/close.svg";
// import logo from "../../assets/balancer.png";
// import { Link } from "react-router-dom";
import TypingAnimation from "../../components/Header/components/TypingAnimation";

interface SearchMenuProps {
  showSearchMenu: boolean;
  handleSearchMenu: () => void;
}

const SearchMenu: React.FC<SearchMenuProps> = ({
  showSearchMenu,
  handleSearchMenu,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3001/drugReviewSearch/",
        {
          drugReviewSearch: inputValue,
        }
      );
      setMessage(response.data.gpt_message.content);
      setSearchResults(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    }
  }, [inputValue]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch(); // This activates/deactivates the search.
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSearchMenu(); // This activates/deactivates the search.
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSearchMenu]);

  return (
    <>
      {showSearchMenu && (
        <div
          className="fixed inset-0 bg-gray-900 opacity-50 z-5"
          onClick={handleSearchMenu}
        ></div>
      )}
      <div
        className={
          showSearchMenu
            ? "fixed p-0 w-[45%] min-h-[30%] max-h-[80%] overflow-y-auto border-l bg-white  ease-in-out  z20 top-[10%] left-1/2 transform -translate-x-1/2 rounded-md"
            : "hidden"
        }
      >
        <div className="flex flex-col justify-center items-center">
          <div className="relative sm:flex items-center w-[100%] h-14 bg-white ring-1 ring-slate-1000/10 hover:ring-slate-300 focus-within:ring-2 focus-within:ring-sky-500 shadow-sm rounded-t-md text-slate-800 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 hover:cursor-pointer hover:text-slate-900"
              aria-hidden="true"
              onClick={handleSearch}
            >
              <path d="m19 19-3.5-3.5"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
            <input
              type="text"
              className="pl-16 pr-3 py-2 w-full h-full bg-transparent text-lg focus:outline-none border-none rounded-t-md"
              placeholder="Let's find out what others are saying"
              value={inputValue}
              onChange={handleInputChange}
            />
            {/* <button onClick={handleSearch}>Search</button> */}

            <kbd
              onClick={() => handleSearchMenu()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer font-sans font-semibold dark:text-slate-500"
            >
              <abbr
                title="Control"
                className="no-underline text-slate-500 dark:text-slate-500"
              >
                ESC{" "}
              </abbr>{" "}
            </kbd>
          </div>

          <div className="font-satoshi text-xl h-20 flex flex-col justify-center items-center text-center">
            <p>Let's find out what others are saying</p>
          </div>
          <div className="flex items-start ml-3 mt-1 text-white max-w-sm">
            {loading ? <TypingAnimation /> : null}
          </div>
          <div className="h-18 p-5 w-[90%] flex flex-col justify-center items-center text-center">
            <p>
              The search results are from a database of over 5000 reviews. You
              can ask me anything and I will summarize what others are saying.
            </p>
          </div>
          <div className="w-[85%] mt-4">
            {message && (
              <h2 className="p-5 font-satoshi font-bold text-gray-600 text-lg">
                Summary of<span className="blue_gradient"> Results</span>
              </h2>
            )}
            <div>
              {message && (
                <p className="mb-4 text-sm p-4 rounded-lg divide-gray-900/5 bg-gray-50 divide-x hover:bg-gray-100 ">
                  {message}
                </p>
              )}
            </div>
            {/* <div>
              {message && (
                <pre
                  style={{
                    // display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxWidth: "100%",
                    overflow: "auto",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                  }}
                  className="mb-4"
                  dangerouslySetInnerHTML={{
                    __html: message,
                  }}
                ></pre>
              )}
            </div> */}
            {message && (
              <h2 className="p-5 font-satoshi font-bold  text-gray-600 text-lg">
                List of<span className="blue_gradient"> Results</span>
              </h2>
            )}
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="mb-4 text-sm p-4 rounded-lg divide-gray-900/5 bg-gray-50 divide-x hover:bg-gray-100"
              >
                <h3 className="font-bold">{result.drugName}</h3>
                <br />
                <p>Review: {result.review}</p>
                <p>Date: {result.date}</p>
                <p>Useful Count: {result.usefulCount}</p>
                <p>Condition: {result.condition}</p>
                {/* Other fields like result.condition, result.date can be rendered similarly if desired */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchMenu;
