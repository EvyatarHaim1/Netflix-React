import React, { useState, useEffect } from 'react';
import axios from '../axios';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow}) {
	const [ movies, setMovies ] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState("");
	
	useEffect(
		() => {
			async function fetchData() {
				const request = await axios.get(fetchUrl);
				console.log(request.data.results);
				setMovies(request.data.results);
				return request;
			}
			fetchData();
		},
		[ fetchUrl ]
	);

	const opts ={
		height: "390",
		width: "100%",
		playerVars: {
			autoplay: 1,
		},
	};

	const handleClick = (movie) => {
		console.log(movie)
		if (trailerUrl) {
			setTrailerUrl("");
		} else {
			movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
		  .then((url) => {
			const urlParams = new URLSearchParams(new URL(url).search);
			setTrailerUrl(urlParams.get("v"));
		  })
		  .catch((error) => console.log(error));
	  }
	};
	
	
		 
		
	return (
		<div className="row">
			<TITLE>{title}</TITLE>
			<ROW_POSTERS>
				{movies.map((movie) => (
					<ROW_POSTER 
					isLargeRow={isLargeRow}
					onClick={()=> handleClick(movie)}
					key={movie.id}
					src={`${baseUrl}${
						isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
				    alt={movie.name} />
				))}
			</ROW_POSTERS>
			{trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
		</div>
	);
}

export default Row;

const ROW_POSTER = styled.img`
width: 100%;
object-fit: contain;
max-height: ${props => props.isLargeRow ? '250px' : '100px'};
transition: transform 450ms;
margin-right: 10px;
&:hover {
	${props => props.isLargeRow ? 'transform: scale(1.09)' : 'transform: scale(1.08)'};
}`

const ROW_POSTERS = styled.div`
display: flex;
overflow-y: hidden;
overflow-x: scroll;
padding: 20px;
&::-webkit-scrollbar{ display: none;}
`
const TITLE = styled.h2`
color: white;
margin-left: 20px;
`
