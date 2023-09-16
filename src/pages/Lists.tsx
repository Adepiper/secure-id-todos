import { FC, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from '../Components/Dropable';
import TaskItem from '../Components/TaskItem';
import { ListState, TaskType, listActions } from '../redux/listSlices';
import { useAppDisPatch } from '../redux/store';

interface Props {
	data: ListState;
}

const Lists: FC<Props> = ({ data }) => {
	const [value, setValue] = useState('');
	const dispatch = useAppDisPatch();

	if (!data) {
		return (
			<p>
				No task selected, Add a new task and select it to show up here
			</p>
		);
	}

	const { tasks, title, id } = data;

	const addNewTask = (e: any) => {
		e.preventDefault();

		if (!value) return;
		const task: TaskType = {
			id: Math.random().toString(),
			title: value,
			is_completed: false,
			is_important: false,
		};

		dispatch(listActions.addNewTask({ listId: id, task }));
		setValue('');
	};

	const completed = tasks.filter((item) => item.is_completed);

	const handleDragEnd = (result: any) => {
		if (!result.destination) return;

		const items = Array.from(tasks);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		dispatch(listActions.updateList({ ...data, tasks: items }));
	};

	return (
		<div className='list_view'>
			<h3>{title} </h3>

			<DragDropContext onDragEnd={handleDragEnd}>
				<StrictModeDroppable droppableId='formFields'>
					{(provided) => (
						<ul
							{...provided.droppableProps}
							ref={provided.innerRef}
							className='taskList'
						>
							{tasks.map((element, index: number) => {
								if (element.is_completed) return null;
								return (
									<Draggable
										key={element.id}
										draggableId={element.id}
										index={index}
									>
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className={'dragItem'}
											>
												<span>
													<i className='fa-solid fa-grip'></i>
												</span>
												<TaskItem
													data={element}
													listId={id}
												/>
											</div>
										)}
									</Draggable>
								);
							})}
							{provided.placeholder}
						</ul>
					)}
				</StrictModeDroppable>
			</DragDropContext>

			{completed.length > 0 && (
				<>
					<div style={{ marginTop: '40px' }}>
						Completed ({completed.length}){' '}
					</div>
					{completed.map((item, index) => (
						<TaskItem key={index} data={item} listId={id} />
					))}
				</>
			)}
			<div className='add_new'>
				<form onSubmit={addNewTask}>
					<input
						type='text'
						placeholder='Add a sub task'
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
					<button type='submit'>
						<i className='fa-solid fa-plus'></i>
					</button>
				</form>
			</div>
		</div>
	);
};

export default Lists;
