import { useState, useEffect, useCallback, useMemo } from "react"
import axios from "axios"
export const useAPI = () => {
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

  useEffect(() => {
    fetchData()
  }, [newSearch, fetchData])

  const updateChange = (value) => {
    setQuery(value)
    setData(null)
  }

  const updateOnSubmit = () => {
    setSearchPhrase(query)
  }

  return {
    updateChange,
    updateOnSubmit,
    data,
    query,
    searchPhrase,
    errors,
    newSearch,
    isLoading,
    addHit,
  }
}
