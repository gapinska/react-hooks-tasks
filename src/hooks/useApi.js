import { useState, useEffect, useCallback, useMemo, useReducer } from "react"
import axios from "axios"

const LOADING_ACTIVATED = "LOADING_ACTIVATED"
const DATA_FETCH_SUCCESS = "DATA_FETCH_SUCCESS"
const DATA_FETCH_FAILURE = "DATA_FETCH_FAILURE"
const ADD_HIT = "ADD_HIT"
const UPDATE_CHANGE = "UPDATE_CHANGE"
const UPDATE_ON_SUBMIT = "UPDATE_ON_SUBMIT"

const initialState = {
  query: "",
  data: "",
  searchPhrase: "",
  errors: null,
  isLoading: false,
}

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case LOADING_ACTIVATED:
      return { ...state, isLoading: true }
    case DATA_FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        searchPhrase: "",
        isLoading: false,
      }
    case DATA_FETCH_FAILURE:
      return { ...state, errors: action.payload, isLoading: false }
    case ADD_HIT:
      return { ...state, data: [...state.data, action.payload] }
    case UPDATE_CHANGE:
      return {
        ...state,
        query: action.payload,
        data: null,
      }
    case UPDATE_ON_SUBMIT:
      return {
        ...state,
        searchPhrase: state.query,
      }
    default:
      return state
  }
}

export const useAPI = () => {
  const [state, dispatch] = useReducer(dataFetchReducer, initialState)
  // const [state, setState] = useState({
  //   query: "",
  //   data: "",
  //   searchPhrase: "",
  //   errors: null,
  //   isLoading: false,
  // })
  const newSearch = useMemo(() => state.searchPhrase, [state.searchPhrase])

  const fetchData = useCallback(() => {
    if (!state.searchPhrase) return
    dispatch({ type: LOADING_ACTIVATED })
    // setState({ ...state, isLoading: true })
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=${state.searchPhrase}`)
      .then((res) => {
        const result = res.data
        dispatch({ type: DATA_FETCH_SUCCESS, payload: result.hits })
        // setState({
        //   ...state,
        //   data: result.hits,
        //   searchPhrase: "",
        //   isLoading: false,
        // })
      })
      .catch((err) => {
        dispatch({ type: DATA_FETCH_FAILURE, payload: err.message })
        // setState({ ...state, errors: err.message, isLoading: false })
      })
  }, [newSearch])

  const hit = {
    objectID: "14273549",
    title: "New hit",
    url: "https://zapier.com/engineering/how-to-build-redux/",
  }

  const addHit = () => {
    dispatch({ type: ADD_HIT, payload: hit })
    // setState({ ...state, data: [...state.data, hit] })
  }

  useEffect(() => {
    fetchData()
  }, [newSearch, fetchData])

  const updateChange = (value) => {
    dispatch({ type: UPDATE_CHANGE, payload: value })
  }

  const updateOnSubmit = () => {
    dispatch({ type: UPDATE_ON_SUBMIT })
    // setState({ ...state, searchPhrase: state.query })
  }

  return {
    updateChange,
    updateOnSubmit,
    state,
    newSearch,
    addHit,
  }
}
