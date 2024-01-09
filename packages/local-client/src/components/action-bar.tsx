import { useActions } from '../hooks/use-actions';
import Button from './button';
import './action-bar.css';

interface ActionBarProps {
	id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
	const { deleteCell, moveCell } = useActions();

	return (
		<div className='action-bar'>
			<Button
				className='fa-arrow-up'
				onClick={() => moveCell(id, 'up')}
			/>

			<Button
				className='fa-arrow-down'
				onClick={() => moveCell(id, 'down')}
			/>
			<Button className='fa-times' onClick={() => deleteCell(id)} />
		</div>
	);
};

export default ActionBar;
