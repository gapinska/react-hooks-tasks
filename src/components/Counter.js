import React, { useState, useEffect, useMemo } from "react"
const black = "black"
const red = "red"

export default function Counter() {
  const [state, setState] = useState(0)
  const [colorOfValue, setColorOfValue] = useState(black)
  const increment = "increment"
  const decrement = "decrement"

  const memoizedValue = useMemo(() => state < 0, [state])

  useEffect(() => {
    setColorOfValue(memoizedValue ? red : black)
  }, [memoizedValue])

  const handleClick = (value) => {
    if (value === increment) {
      setState((prevState) => prevState + 1)
    } else if (value === decrement) {
      setState((prevState) => prevState - 1)
    }
  }

  return (
    <div>
      <div style={{ color: `${colorOfValue}` }}>{state}</div>
      <button onClick={() => handleClick(increment)}>+</button>
      <button onClick={() => handleClick(decrement)}>-</button>
    </div>
  )
}
