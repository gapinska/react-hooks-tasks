import React, { useReducer } from "react"

const initialState = { count: 0, isMinus: "false" }

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
        isMinus: state.count >= 0 ? "false" : "true",
      }
    case "decrement":
      return {
        count: state.count - 1,
        isMinus: state.count > 0 ? "false" : "true",
      }
    default:
      throw new Error()
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      Count: {state.count}
      isMinus: {state.isMinus}
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  )
}

export default Counter
