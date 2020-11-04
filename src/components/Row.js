import React, { useState, useEffect } from 'react';
import axios from '../axios';
import styled from 'styled-components';

const baseUrl = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow}) {
	const [ movies, setMovies ] = useState([]);

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

	console.log(movies);

	return (
		<div className="row">
			<h2>{title}</h2>
			<ROW_POSTERS>
				{movies.map((movie) => (
					<ROW_POSTER 
					isLargeRow={isLargeRow}
					key={movie.id}
					src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
				    alt={movie.name} />
				))}
			</ROW_POSTERS>
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
