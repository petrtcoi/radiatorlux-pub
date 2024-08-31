"use client";

import { Paths } from "@/configs";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

export function SearchBlock() {
  return (
    <Suspense>
      <_SearchBlock />
    </Suspense>
  );
}

function _SearchBlock() {
  const [searchValue, setSearchValue] = useState("");
  const searchParams = useSearchParams();
  const searchStringTooShort = searchValue.length < 3;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchValue || searchStringTooShort) return;

    const params = new URLSearchParams(searchParams);
    params.set("search", searchValue);
    window.location.href = `${Paths.searchResults}?${params.toString()}`;
  };

  return (
    <form className="flex flex-row gap-3 justify-end items-center" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-[1px] border-slate-400 w-52 rounded-sm py-[0.2rem] px-[0.5rem]"
        placeholder="Поиск"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
      <button type="submit" disabled={searchStringTooShort}>
        <Search />
      </button>
    </form>
  );
}
