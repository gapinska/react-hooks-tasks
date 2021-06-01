import React, { useState } from "react"
import "./App.css"
import Counter from "./components/Counter"

const initialState = {
  hits: [
    {
      objectID: "23325319",
      title: "Guerrilla Public Service Redux (2017)",
      url: "https://99percentinvisible.org/episode/guerrilla-public-service/",
    },
    {
      objectID: "14273549",
      title: "Build Yourself a Redux",
      url: "https://zapier.com/engineering/how-to-build-redux/",
    },
  ],
}

function App() {
  const [data, setData] = useState(initialState.hits)
  return (
    <div className="link-hook">
      <div>
        <a
          className="App-link"
          href="https://reactjs.org/docs/hooks-reference.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React Hooks
        </a>
      </div>
      {/* <Counter /> */}
      <div>
        <ul>
          {data.map((item) => (
            <li>{item.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
