import React, { useEffect, useState } from "react";
import { useLocalShows } from "@helpers/localStorage";
import { getRandomEpisodes } from "@requests";
import { Episode } from "@types";
import EpisodeCard from "./EpisodeCard";

export default function RandomEpisodes() {
  const [localShows, setLocalShows] = useLocalShows();
  const [randomEpisodes, setRandomEpisodes] = useState<Episode[]>([]);
  const [shuffle, setShuffle] = useState(false);

  useEffect(() => {
    if (localShows.length === 0) return;
    (async () => {
      const params = new URLSearchParams();
      localShows.forEach((show) =>
        params.append("show_id", show.id.toString())
      );
      params.append("count", "5");
      const data = await getRandomEpisodes(params);
      setRandomEpisodes(data);
    })();
  }, [localShows]);

  useEffect(() => {
    if (randomEpisodes.length < 2) return;
    const temp = [...randomEpisodes];
    const first = temp.shift() as Episode;
    setRandomEpisodes([...temp, first]);
  }, [shuffle]);

  return (
    <div className="episode-container">
      {randomEpisodes.length > 0 &&
        randomEpisodes.map((episode) => (
          <EpisodeCard
            key={episode.id}
            onClick={() => setShuffle(!shuffle)}
            episode={episode}
          />
        ))}
    </div>
  );
}
