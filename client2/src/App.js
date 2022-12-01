import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [counterOne, setCounterOne] = useState(0);
  const [counterTwo, setcounterTwo] = useState(0);
  const [counterThree, setMessageThree] = useState(0);

  const [messageReceived1, setMessageReceived1] = useState(0);
  const [messageReceived2, setMessageReceived2] = useState(0);
  const [messageReceived3, setMessageReceived3] = useState(0);

  const counterMapping = (button) => {
    let payload = {};
    if (button == "btn1") {
      setCounterOne(counterOne + 1);
      payload = { counterOne, button };
    } else if (button == "btn2") {
      setcounterTwo(counterTwo + 1);
      payload = { counterTwo, button };
    } else if (button == "btn3") {
      setMessageThree(counterThree + 1);
      payload = { counterThree, button };
    } else {
      payload = {};
    }
    return payload;
  };

  const sendMessage = async (button) => {
    const payload = await counterMapping(button);
    socket.emit("join_room", "client2");
    socket.emit("send_message", { ...payload, room: "client2" });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      const { button = "" } = data;
      if (button == "btn1") {
        setMessageReceived1(data?.counterOne);
      } else if (button == "btn2") {
        setMessageReceived2(data?.counterTwo);
      } else if (button == "btn3") {
        setMessageReceived3(data?.counterThree);
      }
    });
  }, [socket]);
  return (
    <div className="App">
      <div className="conatainer">
        <h1 className="heading">Project Two</h1>
        <div className="inner-container">
          {/* Counter one */}
          <div className="card">
            <h1 className="headding-text">client : {counterOne}</h1>
            <h1 className="headding-text">client2 :{messageReceived1}</h1>
            <button
              className="btn-submit"
              onClick={() => {
                sendMessage("btn1");
              }}
            >
              {" "}
              Button1
            </button>
          </div>
          {/* Counter two */}
          <div className="card">
            <h1 className="headding-text">client : {counterTwo}</h1>
            <h1 className="headding-text">client2 :{messageReceived2}</h1>
            <button
              className="btn-submit"
              onClick={() => {
                sendMessage("btn2");
              }}
            >
              {" "}
              Button2
            </button>
          </div>
          {/* Counter three */}
          <div className="card">
            <h1 className="headding-text">client : {counterThree}</h1>
            <h1 className="headding-text">client2 :{messageReceived3}</h1>
            <button
              className="btn-submit"
              onClick={() => {
                sendMessage("btn3");
              }}
            >
              {" "}
              Button3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
