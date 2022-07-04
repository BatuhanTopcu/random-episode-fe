import { useEffect, useRef, useState } from "react";
import { useDebounce, useOutsideAlerter } from "@helpers/hooks";
import { Show } from "@types";
import { apiSearch } from "@requests";
import ShowCard from "@components/ShowCard";

export default function Search() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 750);
  const [results, setResults] = useState<Show[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);
  useOutsideAlerter(() => setIsOpen(false), searchRef);

  useEffect(() => {
    if (debouncedSearch) {
      (async () => {
        const data = await apiSearch(debouncedSearch);
        setResults(data);
      })();
    }
  }, [debouncedSearch]);

  return (
    <div className="search__container" ref={searchRef}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="search__results">
          {results.length > 0 && (
            <div className="search__results__scroll">
              {results.map((show) => (
                <ShowCard show={show} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
