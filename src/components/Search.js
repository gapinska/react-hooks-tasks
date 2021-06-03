import React, { useState, useEffect, useCallback, useMemo } from "react"
import axios from "axios"

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

function Search() {
  const [data, setData] = useState()
  const [query, setQuery] = useState("")
  const [searchPhrase, setSearchPhrase] = useState("")
  const fetchData = (searchPhrase) => {
    if (!searchPhrase) return
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=${searchPhrase}`)
      .then((res) => {
        const result = res.data
        setData(result.hits)
        setSearchPhrase("")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const hit = {
    objectID: "14273549",
    title: "New hit",
    url: "https://zapier.com/engineering/how-to-build-redux/",
  }

  const addHit = () => {
    setData((prevData) => [...prevData, hit])
  }

  const newSearch = useMemo(() => searchPhrase, [searchPhrase])

  const handleChange = (e) => setQuery(e.target.value)
  const handleOnSubmit = (e) => {
    e.preventDefault()
    setSearchPhrase(query)
  }
  useEffect(() => {
    fetchData(newSearch)
  }, [newSearch])
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
      <form onSubmit={handleOnSubmit}>
        <input type="text" value={query} onChange={handleChange} />
      </form>
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

export default Search
