import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputState, setInputState] = useState("");
  const [shortLinkState, setShortLinkState] = useState("");

  const apiCall = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:8080",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        url: inputState,
      },
    }).then((data) => {
      setShortLinkState(data.data);
    });
  };

  return (
    <>
      <div className="app">
        <form onSubmit={apiCall}>
          <input
            type="text"
            onChange={(e) => {
              setInputState(e.target.value);
            }}
          ></input>
          <button type="submit">Get shortened link</button>
        </form>
        <div>
          <a className="shortened-link-display" href={shortLinkState} target="_blank">{shortLinkState}</a>
        </div>
      </div>
    </>
  );
}

export default App;
