import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TaskType {
  id: string
  title: string
  note?: string
  is_completed: boolean
  is_important: boolean
}

export interface DefaultTaskType extends TaskType {
  listId: string
}

export interface ListState {
  id: string
  title: string
  is_main: boolean
  tasks: TaskType[]
}

const initialState: {
  lists: ListState[]
  important: DefaultTaskType[]
  myDay: DefaultTaskType[]
} = {
  lists: [
    {
      id: '1',
      tasks: [
        {
          id: '1024',
          title: 'Cleane my room',
          is_completed: false,
          is_important: false,
        },
      ],
      is_main: true,
      title: 'Tasks',
    },
  ],
  important: [],
  myDay: [],
}

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    createList(state, action: PayloadAction<ListState>) {
      state.lists.push(action.payload)
    },
    deleteList(state, action: PayloadAction<string>) {
      state.lists = state.lists.filter((item) => item.id !== action.payload)
    },
    addNewTask(
      state,
      action: PayloadAction<{ listId: string; task: TaskType }>
    ) {
      const { listId, task } = action.payload

      state.lists = state.lists.map((item) => {
        if (item.id === listId)
          return {
            ...item,
            tasks: [...item.tasks, task],
          }

        return item
      })
    },
    updateTask(
      state,
      action: PayloadAction<{ listId: string; task: TaskType }>
    ) {
      const { listId, task } = action.payload

      state.lists = state.lists.map((item) => {
        if (item.id === listId)
          return {
            ...item,
            tasks: item.tasks.map((itm) => {
              if (itm.id === task.id) return task
              return itm
            }),
          }

        return item
      })
    },
    deleteTask(
      state,
      action: PayloadAction<{ listId: string; taskId: string }>
    ) {
      const { listId, taskId } = action.payload

      state.lists = state.lists.map((item) => {
        if (item.id === listId)
          return {
            ...item,
            tasks: item.tasks.filter((task) => task.id !== taskId),
          }

        return item
      })
    },
    updateList(state, action: PayloadAction<ListState>) {
      const updatedItem = action.payload

      state.lists = state.lists.map((item) => {
        if (item.id === updatedItem.id) return updatedItem

        return item
      })
    },
    setLists(state, action: PayloadAction<any>) {
      state.lists = action.payload
    },
    addToMyDay(state, action: PayloadAction<DefaultTaskType>) {
      state.myDay.push(action.payload)
    },
    addToImportant(state, action: PayloadAction<DefaultTaskType>) {
      state.important.push(action.payload)
    },
    removeFromMyDay(state, action: PayloadAction<string>) {
      state.myDay = state.myDay.filter((item) => item.id !== action.payload)
    },
    removeFromImportant(state, action: PayloadAction<string>) {
      state.important = state.important.filter(
        (item) => item.id !== action.payload
      )
    },

    reset: () => initialState,
  },
})

export const listActions = listSlice.actions
export const listReducer = listSlice.reducer
