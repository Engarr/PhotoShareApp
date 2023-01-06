import React, { useState, useEffect } from 'react';
import MasonaryLayout from './MasonaryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import Spinner from './Spinner';

const Search = ({ searchTerm }) => {
	const [pins, setPins] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (searchTerm !== '') {
			setLoading(true);
			const query = searchQuery(searchTerm);
			client.fetch(query).then((data) => {
				setPins(data);
				setLoading(false);
			});
		} else if (searchTerm === '') {
			client.fetch(feedQuery).then((data) => {
				setPins(data);
				setLoading(false);
			});
		}
	}, [searchTerm]);

	return (
		<div>
			{loading && <Spinner message='Searching for pins...' />}
			{pins?.length !== 0 && <MasonaryLayout pins={pins} />}
			{pins?.length === 0 && searchTerm !== '' && !loading && (
				<div className='mt-10 text-center text-xl'>No Pins found!</div>
			)}
		</div>
	);
};

export default Search;
