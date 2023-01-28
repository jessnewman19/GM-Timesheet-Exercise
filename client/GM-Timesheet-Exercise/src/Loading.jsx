import React from 'react';
import PropTypes from "prop-types";

function Loading({setIsLoading}) {

  const loadingFunc = () => { 
    setTimeout(() => { 
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div id="loading-div">{loadingFunc()}Loading ...</div>
  )
}

Loading.propTypes = { 
  setIsLoading: PropTypes.func,
}

export default Loading