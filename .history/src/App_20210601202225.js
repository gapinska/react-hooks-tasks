import React, { useState, useEffect } from "react"
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
  const [data, setData] = useState()

  useEffect(() => {
    setData(initialState.hits)
  }, [])

  const hit = {
    objectID: "14273549",
    title: "New hit",
    url: "https://zapier.com/engineering/how-to-build-redux/",
  }

  const addHit = () => {
    // const newData = [...data, hit]
    setData((prevData) => [...prevData, hit])
  }
  return (
    <div>
      <div>
        <a
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
          {data?.map((item) => (
            <li key={item.objectID}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={addHit}>Add hit</button>
    </div>
  )
}

export default App
