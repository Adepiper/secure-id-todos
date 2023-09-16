import React, { FC, useState } from 'react';
import { TaskType, listActions } from '../redux/listSlices';
import { useAppDisPatch } from '../redux/store';
import toast from 'react-hot-toast';

interface Props {
	data: TaskType;
	listId: string;
	onClose: () => void;
}

const EditTask: FC<Props> = ({ data, listId, onClose }) => {
	const [task, settask] = useState(data);

	const dispatch = useAppDisPatch();

	const addToMyDay = () => {
		dispatch(listActions.addToMyDay({ ...data, listId }));
		toast.success(
			'You have successfully added todos to your daily todo list'
		);
	};

	const updateTask = () => {
		if (!task.title) return;
		dispatch(listActions.updateTask({ listId, task }));
		onClose();
	};
	const deleteTask = () => {
		dispatch(listActions.deleteTask({ listId, taskId: data.id }));
		onClose();
	};

	return (
		<div className='edit_task'>
			<div className='edit_task-content'>
				<button className='close' onClick={onClose}>
					x
				</button>
				<input
					type='text'
					placeholder='Add Task'
					value={task.title}
					onChange={(e) =>
						settask((prev) => ({ ...prev, title: e.target.value }))
					}
				/>

				<textarea
					name=''
					placeholder='Add note'
					id=''
					value={task.note}
					onChange={(e) =>
						settask((prev) => ({ ...prev, note: e.target.value }))
					}
				></textarea>

				<button onClick={addToMyDay} className='btn_myday'>
					<i className='fa-regular fa-sun'></i>Add to My Day
				</button>
				<div className='edit_task-content_actions'>
					<button onClick={updateTask}>Save</button>
					<button onClick={deleteTask}>
						<i className='fa-solid fa-trash'></i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditTask;
