import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Todo, User } from '../@types';
import TodoList from '../components/TodoList';
import UserList from '../components/UserList';

const usersClient = axios.create({baseURL: process.env.REACT_APP_USERS_SERVICE});
const todosClient = axios.create({baseURL: process.env.REACT_APP_TODOS_SERVICE});

function Home() {
  const [usersList, setUsers] = useState<User[]>([])
  const [todosList, setTodos] = useState<Todo[]>([])

  const fetchUsers = useCallback(async() => {
    const response = await usersClient.get('/users', {
      headers: {
        'Referrer-Policy': 'no-referer'
      }
    })
    setUsers(response.data)
  }, [])

  const fetchTodos = useCallback(async() => {
    const response = await todosClient.get('/todos')
    setTodos(response.data)
  }, [])

  useEffect(() => {
    fetchUsers()
    fetchTodos()
  }, [])
  
  const onUpdateTodo = useCallback(async(todo: Todo) => {
    await todosClient.put(`/todos/${todo.id}`, todo)
    await fetchTodos()
  }, [fetchTodos])

  const onDeleteTodo = useCallback(async(todo: Todo) => {
    await todosClient.delete(`/todos/${todo.id}`)
    await fetchTodos()
  }, [fetchTodos])

  const onAddTodo = useCallback(async(todo: Todo) => {
    await todosClient.post(`/todos`, todo)
    await fetchTodos()
  }, [fetchTodos])

  const onAddUser = useCallback(async(user:User) => {
    await usersClient.post('/users', user)
    await fetchUsers()
  }, [fetchUsers])

  const onAssignUser = useCallback(async (user:User, todo:Todo) => {
    await todosClient.patch(`/todos/${todo.id}/assign/${user.id}`)
    await fetchTodos()
  }, [fetchTodos])

  return (
    <>
    <Typography sx={{marginTop: '20px'}}>
      THEODO DOJO
    </Typography>
    <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'top', justifyContent: 'center'}}>
      <TodoList 
        list={todosList}
        users={usersList}
        onAssignUser={onAssignUser}
        onAddTodo={onAddTodo} 
        onDeleteTodo={onDeleteTodo}
        onUpdateTodo={onUpdateTodo}
      />
      <UserList
        list={usersList}
        onAddUser={onAddUser}
      />
    </Box>
    </>
  )
}

export default Home