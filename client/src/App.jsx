import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [inputState, setInputState] = useState("");
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
  }

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
          <p className="shortened-link-display">{shortLinkState.message}</p>
          {shortLinkState.valid ? <button onClick={copyToClipboard}>Copy to clipboad</button> : <></>}
        </div>
      </div>
    </>
  );
}

export default App;
