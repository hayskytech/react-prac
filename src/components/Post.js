import React, { useEffect, useState } from 'react'
import './Post.css'
export default function Person() {

	const [data, setData] = useState(null);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://muslimawaaz.com/wp-json/wp/v2/posts?per_page=10');
				const json = await response.json();
				setData(json);
			} catch (error) {
				console.log('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);
	return (
		<div>
			{data ? (
				<div className='newsgrid'>
					{data.map((item) => (
						<div key={item.id}>
							<img src={item.jetpack_featured_media_url} alt="" />
							<h2>{item.title.rendered}</h2>
							<h3>{item.id}</h3>
						</div>
					))}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}
