import { useState } from "react";
import axios from "axios";
import "./App.css";
import copyIcon from "./assets/content-copy.png";

function App() {
  const [inputState, setInputState] = useState("http://");
  const [shortLinkState, setShortLinkState] = useState({
    valid: false,
    message: "",
  });

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

  const copyToClipboard = (e) => {
    const copyText = e.target.previousSibling.innerText;
    navigator.clipboard.writeText(copyText);
  };

  const shortLinkDisplay = (
    <fieldset className="short-link-container">
      <legend>Your Link</legend>
      <p className="shortened-link-display">{shortLinkState.message}</p>
      <button className="copy-button" onClick={copyToClipboard}>
        <img className="icon" src={copyIcon} />
      </button>
    </fieldset>
  );

  return (
    <>
      <nav className="nav-bar">
        <h1 className="header-text">URL Shortener</h1>
      </nav>
      <div className="app">
        <form onSubmit={apiCall}>
          <input
            className="link-input"
            value={inputState}
            type="text"
            onChange={(e) => {
              if (e.target.value.length < 7) {
                setInputState("http://");
              } else {
                setInputState(e.target.value);
              }
            }}
          ></input>
          <button type="submit">Get shortened link</button>
        </form>
        {shortLinkState.valid ? shortLinkDisplay : <></>}
      </div>
    </>
  );
}

export default App;
