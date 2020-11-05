import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import axios from '../axios';
import requests from '../requests';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
      async function fetchData() {
        const request = await axios.get(requests.fetchNetflixOriginals);
        setMovie(
            request.data.results[
            Math.floor(Math.random() * request.data.results.length-1)
        ]
      );
      return request;
    }
     fetchData();
  }, [])

  console.log(movie);

  function truncate(str,n){
      return str?.length > n ? str.substr(0, n-1) + "..." : str;
  }

    return (
        <HEADER movie={movie} className="banner">
            <BANNER_CONTENT>
                <BANNER_TITLE>
                    {movie?.title || movie?.name || movie?.original_name} 
                </BANNER_TITLE>
                <BANNER_BUTTONS>
                    <BANNER_BUTTON>Play</BANNER_BUTTON>
                    <BANNER_BUTTON>My List</BANNER_BUTTON>
                </BANNER_BUTTONS>
                <BANNER_DESCRIPTION> {truncate(movie.overview, 150)}</BANNER_DESCRIPTION>
                <FADE_BANNER />
            </BANNER_CONTENT>
        </HEADER>
    )
}

export default Banner

const HEADER = styled.header`
background-size: cover;
background-image: ${props => `url(
  https://image.tmdb.org/t/p/original/${props.movie?.backdrop_path})`};
background-position: center center;
color: white;
object-fit: contain;
height: 448px;
`
const BANNER_CONTENT = styled.div`
margin-left: 30px;
padding-top: 140px;
height: 190px;
`
const BANNER_TITLE = styled.h1`
font-size: 3rem;
font-weight: 800;
padding-bottom: 0.3rem;
`
const BANNER_BUTTONS = styled.div``

const BANNER_BUTTON = styled.button`
cursor: pointer;
color: #fff;
outline:none;
border: none;
font-weight: 700;
border-radius: 0.2vw;
padding-left: 2rem;
padding-right: 2rem;
margin-right: 1rem;
padding-top: 0.5rem;
padding-bottom: 0.5rem;
background-color: rgba(51,51,51,0.5);
:hover {
    color: #000;
    background-color: #e6e6e6;
    transition: all 0.2s;
}`
const BANNER_DESCRIPTION = styled.h1`
width: 45rem;
line-height: 1.3;
padding-top: 1rem;
font-size: 0.8rem;
max-width: 360px;
height: 80px;`

const FADE_BANNER = styled.div`
height: 7.4rem;
background-image: linear-gradient(180deg, transparent,rgba(37,37,37,0.61), #111);`