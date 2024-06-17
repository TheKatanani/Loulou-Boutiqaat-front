import React, { useState } from "react";
import { StyleSearch } from "./styles";
import LogoLoading from "../common/LogoLoading";
import { Link, useNavigate } from "react-router-dom";
import { STATUS } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";
import { selectPublishedCategoryies, selectStatus } from "../../redux/reducers/categories";
import { fetchSearchResults, selectCategoryId, selectSearchResults, selectSearchTerm, setCategory, setSearchTerm } from "../../redux/reducers/search";

function SearchComponent({ isOnChangeRequest = false }) {
  const [blur, setBlur] = useState(true);
  const dispatch = useDispatch()
  const { data: myResults } = useSelector(selectSearchResults)
  const categories = useSelector(selectPublishedCategoryies)
  const status = useSelector(selectStatus)
  const searchTerm = useSelector(selectSearchTerm)
  const categoryId = useSelector(selectCategoryId)
  const navigate = useNavigate()

  const handleEnterKeyDown = (event) => {
    if (event.key === 'Enter') {
      // save the most resent here 
      setBlur(true)
      navigate('/home/search')
    }
  }
  const handleSearch = (searchTerm) => {
    dispatch(setSearchTerm(searchTerm))
    if (isOnChangeRequest) {
      let debounceTimer;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        dispatch(fetchSearchResults({ searchTerm, categoryId }))
      }, 500);
    }
  };
  const handleSelectChange = (value) => {
    dispatch(setCategory(value))
    handleSearch(searchTerm)
  }
  const handelSubmit = (e) => {
    e.preventDefault()
    let debounceTimer;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      dispatch(fetchSearchResults({ searchTerm, categoryId }))
    }, 500);
  }
  if (status === STATUS.LOADING) {
    return <LogoLoading />
  }
  return (
    <StyleSearch className="searchBox"{...{ isOnChangeRequest }} onSubmit={handelSubmit}>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleEnterKeyDown}
        onBlur={() => {
          setTimeout(() => {
            setBlur(true)
          }, 250)
        }}
        onFocus={() => {
          setBlur(false)
        }}
      />
      <select value={categoryId} onChange={(e) => handleSelectChange(e.target.value)}>
        <option defaultValue="" value="">All category</option>
        {
          categories?.map((catig) => (
            <option key={catig.id} value={catig?.id}>{catig?.name}</option>
          ))
        }
      </select>
      <button type="submit">Search</button>
      <ul className={`results ${blur && 'd-none'} ${myResults?.length <= 0 && 'd-none'}`}>
        {
          myResults?.slice(0, 4)?.map((resulte) => (
            <Link key={resulte.id} to={`/home/products/${resulte.id}`}>
              <li>{resulte.name}</li>
            </Link>
          ))
        }
      </ul>
    </StyleSearch>
  );
}

export default SearchComponent;
