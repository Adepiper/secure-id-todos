import { FC, useState } from 'react';
import { TaskType, listActions } from '../redux/listSlices';
import { useAppDisPatch, useAppSelector } from '../redux/store';
import EditTask from './EditTask';
import toast from 'react-hot-toast';

interface Props {
	data: TaskType;
	listId: string;
}

const TaskItem: FC<Props> = ({ data, listId }) => {
	const dispatch = useAppDisPatch();
	const [showEdit, setshowEdit] = useState(false);
	const { important, myDay } = useAppSelector((state) => state.list);
	const markAsImportant = () => {
		if (data.is_important) {
			dispatch(listActions.removeFromImportant(data.id));
			toast.success(
				'You have successfully removed the todo from important todos'
			);
		} else {
			dispatch(
				listActions.addToImportant({
					...data,
					listId,
					is_important: !data.is_important,
				})
			);
			toast.success(
				'You have successfully added the todo to important todos'
			);
		}
		dispatch(
			listActions.updateTask({
				listId,
				task: { ...data, is_important: !data.is_important },
			})
		);
	};
	const completeTask = () => {
		if (data.is_completed) return;

		const isImportant = important.find(
			(item) => item.id === data.id && item.listId === listId
		);
		const isMyDay = myDay.find(
			(item) => item.id === data.id && item.listId === listId
		);

		if (isImportant) dispatch(listActions.removeFromImportant(data.id));
		if (isMyDay) dispatch(listActions.removeFromMyDay(data.id));

		dispatch(
			listActions.updateTask({
				listId,
				task: { ...data, is_completed: !data.is_completed },
			})
		);
		toast.success('Marked as completed');
	};

	return (
		<div className='taskItem'>
			<span
				className={data.is_completed ? 'completed' : 'undone'}
				onClick={completeTask}
			>
				<i className='fa-solid fa-check'></i>
			</span>
			<p>{data.title}</p>
			{!data.is_completed && (
				<div className='taskItem_actions'>
					<span onClick={() => setshowEdit(true)}>Edit</span>
					<button onClick={markAsImportant}>
						{data.is_important ? (
							<i className='fa-solid fa-star'></i>
						) : (
							<i className='fa-regular fa-star'></i>
						)}
					</button>
				</div>
			)}
			{showEdit && (
				<EditTask
					data={data}
					listId={listId}
					onClose={() => setshowEdit(false)}
				/>
			)}
		</div>
	);
};

export default TaskItem;
