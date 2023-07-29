import React, { useState } from "react";
import axios from "axios";
// import closeLogo from "../../assets/close.svg";
// import logo from "../../assets/balancer.png";
// import { Link } from "react-router-dom";

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/drugReviewSearch",
        {
          drugReviewSearch: inputValue,
        }
      );
      setMessage(response.data.gpt_message.content);
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Failed to fetch results:", error);
    }
  };

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
          <div className="relative sm:flex items-center w-[100%] h-14 bg-white ring-1 ring-slate-1000/10 hover:ring-slate-300 focus-within:ring-2 focus-within:ring-sky-500 shadow-sm rounded-t-md text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700">
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-300 dark:text-slate-400"
              aria-hidden="true"
              onClick={handleSearch}
            >
              <path d="m19 19-3.5-3.5"></path>
              <circle cx="11" cy="11" r="6"></circle>
            </svg>
            <input
              type="text"
              className="pl-10 pr-3 py-2 w-full h-full bg-transparent focus:outline-none border-none rounded-t-md"
              placeholder="Quick search..."
              value={inputValue}
              onChange={handleInputChange}
            />
            {/* <button onClick={handleSearch}>Search</button> */}

            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 font-sans font-semibold dark:text-slate-500">
              <abbr
                title="Control"
                className="no-underline text-slate-300 dark:text-slate-500"
              >
                ESC{" "}
              </abbr>{" "}
            </kbd>
          </div>

          <div className="font-satoshi text-xl h-14 flex flex-col justify-center items-center text-center">
            <p>See what others are saying</p>
          </div>
          <div className="h-18 w-[75%] flex flex-col justify-center items-center text-center">
            <p>
              The search results are from a database of over 5000 reviews. You
              can ask me anything and I will summarize what others are saying.
            </p>
          </div>
          <div className="w-[75%] mt-4">
            {message && <p className="font-bold mb-4">{message}</p>}
            {searchResults.map((result, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold">{result.drugName}</h3>
                <p>{result.review}</p>
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
