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
  const { updateChange, updateOnSubmit, state, query, newSearch, addHit } =
    useAPI()

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
      <form onSubmit={handleOnSubmit}>
        <input type="text" value={state.query} onChange={handleChange} />
      </form>
      <div>
        {state.errors && <div>{state.errors}</div>}
        {state.isLoading && <div>Loading...</div>}
        {state.data && (
          <ul>
            {state.data?.map(
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
