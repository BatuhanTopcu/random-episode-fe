import { useEffect, useState, useMemo } from "react";
import { Show } from "@types";
import { addRemoveShow, useLocalShows } from "@helpers/localStorage";
const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE_ORGINAL_URL;

type ClickState = "none" | "once" | "twice";

export default function ShowCard({ show }: { show: Show }) {
  const [localShows] = useLocalShows();
  const isAdded = useMemo(
    () => localShows.some((s) => s.id === show.id),
    [localShows, show.id]
  );
  const [clickState, setClickState] = useState<ClickState>("none");
  const overlayState = useMemo(
    () => clickState === "once" || clickState === "twice",
    [clickState]
  );

  const handleClick = () => {
    switch (clickState) {
      case "none":
        setClickState("once");
        break;
      case "once":
        setClickState("twice");
        break;
      case "twice":
        setClickState("none");
        break;
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (clickState === "twice") {
      addRemoveShow(show);
      timeout = setTimeout(() => {
        setClickState("none");
      }, 750);
    }
    if (clickState === "once") {
      timeout = setTimeout(() => {
        setClickState("none");
      }, 1500);
    }
    return () => clearTimeout(timeout);
  }, [clickState]);

  return (
    <div className="show-card" onClick={handleClick}>
      <div className={`overlay ${overlayState ? "show" : ""}`}>
        {clickState === "once" &&
          `Click again for ${isAdded ? "removing from" : "adding to"} list`}
        {clickState === "twice" && `${isAdded ? "Added" : "Removed"}`}
      </div>
      <h1 className={`${overlayState ? "hide" : ""}`}>{show.name}</h1>
      {show.overview && (
        <h2 className={`${overlayState ? "hide" : ""}`}>{show.overview}</h2>
      )}
      {show.backdrop_path && (
        <img
          className="show-card__bg"
          src={IMG_BASE + show.backdrop_path}
          alt={show.name}
        />
      )}
    </div>
  );
}
