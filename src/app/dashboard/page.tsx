'use client';
import { useState } from 'react';

const Home: React.FC = () => {
	const [count, setCount] = useState(0);
	const handleClick: () => void = () => {
		setCount((count: number) => count + 1);
	};

	return (
		<div>
			<h1>{count}</h1>
			<button onClick={handleClick}>Click</button>
		</div>
	);
};

export default Home;
