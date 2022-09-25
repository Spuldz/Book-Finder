import axios from "axios";
import { useState } from "react";
import "./App.css";
import "./media.css";
import Card from "./components/Card";

function App() {
  const [Bookdata, setBookData] = useState([]);
  const [searched, setSearched] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Loading");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);
  const KEY = "AIzaSyBa2iZJ7pItd3__rDQQ9yBwObasZIel43Y";
  let cards = [];
  let loadingTimer;

  function search(book) {
    let times = 0;
    setSearched("");
    setClicked(false);
    setLoaded(false);
    setClicked(true);
    setFailed(false);
    setLoading(true);
    let search = document.getElementById("search");
    search.value = "";

    loadingTimer = setInterval(() => {
      setLoadingLabel((loadingLabel) => loadingLabel + ".");
      times++;

      if (times === 3) {
        setLoadingLabel((loadingLabel) => "Loading");
        times = 0;
      }
    }, 100);

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          KEY +
          "&maxResults=20"
      )
      .then((res) => {
        clearInterval(loadingTimer);
        setBookData(res.data.items);
        setLoading(false);
        setFailed(false);
        setLoaded(true);
      })
      .catch((err) => {
        setLoading(false);
        setLoaded(true);
        setFailed(true);
      });
  }

  return (
    <>
      <div className="titleContainer">
        <p id="moto">Look for your favourite books</p>
      </div>
      <div className="searchContainer">
        <input
          id="search"
          placeholder="search"
          onChange={(e) => setSearched(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search(searched);
            }
          }}
        />
        <button
          id="btn"
          onClick={() => {
            search(searched);
          }}
        >
          Search
        </button>
      </div>

      {clicked ? (
        !loaded ? (
          <p className="loadingLabel">{loadingLabel}</p>
        ) : (
          <div className="resultsContainer">
            <Card book={Bookdata} />
          </div>
        )
      ) : null}

      {failed && !loading ? (
        <p className="loadingLabel">Failed to load books</p>
      ) : null}
    </>
  );
}

export default App;
