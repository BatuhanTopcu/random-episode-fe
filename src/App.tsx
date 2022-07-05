import { useEffect } from "react";
import { getRandomEpisodes } from "@requests";
import { addRemoveShow, useLocalShows } from "@helpers/localStorage";
import Search from "@components/Search";
import ShowList from "@components/ShowList";

function App() {
  const [localShows, setLocalShows] = useLocalShows();

  // useEffect(() => {
  //   (async () => {
  //     const params = new URLSearchParams();
  //     params.append("show_id", "1100");
  //     params.append("show_id", "52");
  //     const data = await getRandomEpisodes(params);
  //     console.log(data, "sa");
  //   })();
  // }, []);

  return (
    <div className="App">
      <Search />
      <ShowList />
    </div>
  );
}

export default App;
