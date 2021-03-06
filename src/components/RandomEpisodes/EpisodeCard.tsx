import React, { useEffect, useMemo, useRef, useState } from "react";
import { Episode } from "@types";
const IMG_BASE = import.meta.env.VITE_TMDB_IMG_BASE_ORGINAL_URL;

type IEpisodeCardProps = {
  episode: Episode;
  onClick: () => void;
};

export default function EpisodeCard({ episode, onClick }: IEpisodeCardProps) {
  const randomTilt = useRef(Math.random() * 3 * (Math.random() > 0.5 ? 1 : -1));
  const randomHue = useRef(Math.floor(Math.random() * 360).toString());

  const style = {
    "--random-hue": `${randomHue.current}`,
    "--random-tilt": `${randomTilt.current}deg`,
  } as React.CSSProperties;

  return (
    <div className="episode-card" style={style} onClick={onClick}>
      <div className="episode-card__top">
        <h1 className="show">{episode.show_name}</h1>
        <h1 className="season">
          S{episode.season_number}
          <span>E{episode.episode_number}</span>
        </h1>
        <h1 className="name">
          {episode.name}{" "}
          {episode.vote_average > 0 && `(${episode.vote_average})`}
        </h1>
      </div>
      <h1 className="overview">{episode.overview}</h1>
      {episode.show_backdrop_path && (
        <img
          className="episode-card__bg"
          src={IMG_BASE + episode.show_backdrop_path}
          alt={episode.show_name}
        />
      )}
    </div>
  );
}
