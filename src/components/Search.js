import React from "react"
import { useAPI } from "../hooks/useApi"

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
  const {
    updateChange,
    updateOnSubmit,
    data,
    query,
    searchPhrase,
    errors,
    newSearch,
    isLoading,
    addHit,
  } = useAPI()

  const handleChange = (e) => {
    updateChange(e.target.value)
  }
  const handleOnSubmit = (e) => {
    e.preventDefault()
    updateOnSubmit()
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
