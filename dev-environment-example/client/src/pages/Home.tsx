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
  
  const event = (obj: any) => {
    console.info(obj)
  } 

  return (
    <>
    <Typography>
      THEODO DOJO
    </Typography>
    <Box sx={{display: 'flex', flexDirection: 'row'}}>
      <TodoList 
        list={todosList}
        onAddTodo={event} 
        onDeleteTodo={event}
        onUpdateTodo={event}
      />
      <UserList
        list={usersList}
        onAddUser={event}
      />
    </Box>
    </>
  )
}

export default Home