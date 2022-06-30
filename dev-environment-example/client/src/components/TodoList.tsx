import { Checkbox, Divider, IconButton, Input, List, ListItem, MenuItem, Select, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React, { useCallback, useState } from 'react';
import { Todo, User } from '../@types';
import map from 'lodash/map'
import { Box } from '@mui/system';
import { find } from 'lodash';

interface TodoListProps {
  list: Todo[]
  users: User[]
  onAssignUser: (user: User, todo: Todo) => void
  onAddTodo: (todo: Todo) => void
  onDeleteTodo: (todo: Todo) => void
  onUpdateTodo: (todo: Todo) => void
}

function TodoList(props: TodoListProps) {  
  const [newTodo, setNewTodo] = useState<Todo>({details: '', completed: false})

  const handleAddTodo = useCallback(() => {
    props.onAddTodo(newTodo)
    setNewTodo({details: '', completed: false})
  }, [newTodo, props])  

  return (
    <>
    <Box sx={{ padding: '45px', display: 'flex', flexShrink: 1, flexDirection: 'column', alignItems: 'top', justifyContent: 'center'}}> 
      <Typography>
        Add Todo
      </Typography>      
      <Box>
        <Input 
          sx={{margin: '4px'}}
          placeholder='Todo' 
          onChange={e => setNewTodo({...newTodo, ...{details: e.target.value}})} 
          value={newTodo.details}
           onKeyDown={(e) => { if(e.code === "Enter") {handleAddTodo()}}}/>
      </Box>
      <Divider sx={{margin: '8px'}}/>
      <Typography>
        Todos
      </Typography>              
      <List>
        {
          map(props.list, (todo) => {
            return (
              <ListItem key={todo.id}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <Typography>
                    {todo.details}
                  </Typography>
                  <Select
                    sx = {{marginLeft: '4px', marginRight: '4px', minWidth: '160px' }}                    
                    value={todo.assigned_to ?? ''}                   
                    label="Assignee"
                    onChange={(id) => props.onAssignUser(find(props.users, sel => sel.id === id.target.value)!, todo)}
                  >
                    {map(props.users, (user) => {
                      return (
                        <MenuItem value={user.id}>{user.first_name} {user.last_name}</MenuItem>
                      )
                    })}
                  </Select>
                  <Checkbox 
                    checked={todo.completed} 
                    onChange={
                      () => props.onUpdateTodo({...todo, ...{completed: !todo.completed}})
                    }
                  />
                  <IconButton 
                    onClick={
                      () => props.onDeleteTodo(todo)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            )
          })
        }
      </List>      
    </Box>
    </>
  )
}

export default TodoList