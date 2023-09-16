import React from 'react'
import { DragDropContext, Draggable } from 'react-beautiful-dnd'
import { StrictModeDroppable } from '../Components/Dropable'
import TaskItem from '../Components/TaskItem'
import { useAppSelector } from '../redux/store'

const MyDay = () => {
  const tasks = useAppSelector((state) => state.list.myDay)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    console.log(result)
  }

  return (
    <div>
      <h3>My Day</h3>
      <div>
        <DragDropContext onDragEnd={handleDragEnd}>
          <StrictModeDroppable droppableId='formFields'>
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='taskList'>
                {tasks.map((element, index: number) => {
                  if (element.is_completed) return null
                  return (
                    <Draggable
                      key={element.id}
                      draggableId={element.id}
                      index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={'dragItem'}>
                          <span>
                            <i className='fa-solid fa-grip'></i>
                          </span>
                          <TaskItem data={element} listId={element.listId} />
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {provided.placeholder}
              </ul>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </div>
    </div>
  )
}

export default MyDay
