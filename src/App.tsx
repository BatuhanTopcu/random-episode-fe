import { useEffect } from "react";
import { getRandomEpisodes } from "@requests";
import { addRemoveShow, useLocalShows } from "@helpers/localStorage";
import Search from "@components/Search";
import ShowList from "@components/ShowList";
import RandomEpisodes from "@components/RandomEpisodes";

function App() {
  return (
    <div className="App">
      <Search />
      <RandomEpisodes />
      <ShowList />
    </div>
  );
}

export default App;
