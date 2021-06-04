import React, { useState, useEffect, useCallback, useMemo } from "react"
import axios from "axios"

// const initialState = {
//   hits: [
//     {
//       objectID: "23325319",
//       title: "Guerrilla Public Service Redux (2017)",
//       url: "https://99percentinvisible.org/episode/guerrilla-public-service/",
//     },
//     {
//       objectID: "14273549",
//       title: "Build Yourself a Redux",
//       url: "https://zapier.com/engineering/how-to-build-redux/",
//     },
//   ],
// }

function Search() {
  const [data, setData] = useState()
  const [query, setQuery] = useState("")
  const [searchPhrase, setSearchPhrase] = useState("")
  const [errors, setErrors] = useState(null)
  const newSearch = useMemo(() => searchPhrase, [searchPhrase])
  const [isLoading, setIsLoading] = useState(false)
  const fetchData = useCallback(() => {
    if (!searchPhrase) return
    setIsLoading(true)
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=${searchPhrase}`)
      .then((res) => {
        const result = res.data
        setData(result.hits)
        setSearchPhrase("")
        setIsLoading(false)
      })
      .catch((err) => {
        setErrors(err.message)
        setIsLoading(false)
      })
  }, [newSearch])

  const hit = {
    objectID: "14273549",
    title: "New hit",
    url: "https://zapier.com/engineering/how-to-build-redux/",
  }

  const addHit = () => {
    setData((prevData) => [...prevData, hit])
  }

  const handleChange = (e) => {
    setQuery(e.target.value)
    setData(null)
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    setSearchPhrase(query)
  }
  useEffect(() => {
    fetchData()
  }, [newSearch, fetchData])
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
        {errors && <div>{errors}</div>}
        {isLoading && <div>Loading...</div>}
        {data && (
          <ul>
            {data?.map(
              (item) =>
                item.title && (
                  <li key={item.objectID}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.title}
                    </a>
                  </li>
                )
            )}
          </ul>
        )}
      </div>
      <button onClick={addHit}>Add hit</button>
    </div>
  )
}

export default Search
