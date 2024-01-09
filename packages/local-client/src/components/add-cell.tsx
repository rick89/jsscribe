import './add-cell.css';
import { useActions } from '../hooks/use-actions';
import { Button } from '../components/button';

interface AddCellProps {
	previousCellId: string | null;
	forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
	const { insertCellAfter } = useActions();
	return (
		<div className={`add-cell${forceVisible ? ' force-visible' : ''}`}>
			<div className='add-buttons'>
				<Button
					rounded={true}
					text='+ Code'
					onClick={() => insertCellAfter(previousCellId, 'code', '')}
				/>
				<Button
					rounded={true}
					text='+ Text'
					onClick={() => insertCellAfter(previousCellId, 'text', '')}
				/>
			</div>
			<div className='divider'></div>
		</div>
	);
};

export default AddCell;
