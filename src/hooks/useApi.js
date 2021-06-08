import { useState, useEffect, useCallback, useMemo } from "react"
import axios from "axios"
export const useAPI = () => {
  const [state, setState] = useState({
    query: "",
    data: "",
    searchPhrase: "",
    errors: null,
    isLoading: false,
  })
  const newSearch = useMemo(() => state.searchPhrase, [state.searchPhrase])

  const fetchData = useCallback(() => {
    if (!state.searchPhrase) return
    setState({ ...state, isLoading: true })
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=${state.searchPhrase}`)
      .then((res) => {
        const result = res.data
        setState({
          ...state,
          data: result.hits,
          searchPhrase: "",
          isLoading: false,
        })
      })
      .catch((err) => {
        setState({ ...state, errors: err.message, isLoading: false })
      })
  }, [newSearch])

  const hit = {
    objectID: "14273549",
    title: "New hit",
    url: "https://zapier.com/engineering/how-to-build-redux/",
  }

  const addHit = () => {
    setState({ ...state, data: [...state.data, hit] })
  }

  useEffect(() => {
    fetchData()
  }, [newSearch, fetchData])

  const updateChange = (value) => {
    setState({ ...state, query: value, data: null })
  }

  const updateOnSubmit = () => {
    setState({ ...state, searchPhrase: state.query })
  }

  return {
    updateChange,
    updateOnSubmit,
    state,
    newSearch,
    addHit,
  }
}
