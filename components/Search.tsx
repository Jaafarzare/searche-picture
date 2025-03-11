"use client";

import { useEffect, useState } from "react";
import ButtonCustom from "./ButtonCustom";
import InputCustom from "./InputCustom";
import { IoIosSearch } from "react-icons/io";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<
    { query: string; count: number }[]
  >([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    if (!searchQuery.trim()) return;

    onSearch(searchQuery);

    const existingEntry = searchHistory.find(
      (item) => item.query === searchQuery
    );
    let updatedHistory;

    if (existingEntry) {
      updatedHistory = searchHistory.map((item) =>
        item.query === searchQuery ? { ...item, count: item.count + 1 } : item
      );
    } else {
      updatedHistory = [{ query: searchQuery, count: 1 }, ...searchHistory];
    }

    updatedHistory.sort((a, b) => b.count - a.count).slice(0, 5);
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const handleClearAllHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 p-4">
        <InputCustom
          value={searchQuery}
          onChange={handleSearchInputChange}
          type="text"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSearchClick();
            }
          }}
          placeholder="دنبال چه تصویری هستی..."
          className="flex-1"
        />
        <ButtonCustom
          variant="outline"
          className="hover:cursor-pointer transition-colors"
          onClick={handleSearchClick}
        >
          <IoIosSearch />
        </ButtonCustom>
      </div>

      {searchHistory.length > 0 && (
        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              آخرین جستجوها:
            </p>
            <ButtonCustom
              variant="secondary"
              onClick={handleClearAllHistory}
              className="hover:cursor-pointer hover:bg-gray-200 hover:text-black transition-colors"
            >
              پاک کردن همه
            </ButtonCustom>
          </div>
          <div className="flex gap-2 flex-wrap">
            {searchHistory.map((item, index) => (
              <div key={index} className="relative inline-block">
                <button
                  onClick={() => {
                    setSearchQuery(item.query);
                    onSearch(item.query);
                  }}
                  className="bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-400 hover:cursor-pointer transition-colors"
                >
                  {item.query} ({item.count})
                </button>
                <button
                  onClick={() => {
                    const updatedHistory = searchHistory.filter(
                      (h) => h.query !== item.query
                    );
                    setSearchHistory(updatedHistory);
                    localStorage.setItem(
                      "searchHistory",
                      JSON.stringify(updatedHistory)
                    );
                  }}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
