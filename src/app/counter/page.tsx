'use client';
import { decrement, increment, incrementByAmount } from '@/redux/counter/slice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';

const Counter: React.FC = () => {
	const dispatch = useAppDispatch();
	const { count } = useAppSelector((state) => state.counter);
	return (
		<div>
			<h1>Counter: {count}</h1>
			<button onClick={() => dispatch(increment())}>Increment</button>
			<button onClick={() => dispatch(decrement())}>Decrement</button>
			<button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
		</div>
	);
};

export default Counter;
