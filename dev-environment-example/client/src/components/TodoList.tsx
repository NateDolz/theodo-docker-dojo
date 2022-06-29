import { Checkbox, IconButton, List, ListItem, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { Todo } from '../@types';
import map from 'lodash/map'
import { Box } from '@mui/system';

interface TodoListProps {
  list: Todo[]
  onAddTodo: (todo: Todo) => void
  onDeleteTodo: (todo: Todo) => void
  onUpdateTodo: (todo: Todo) => void
}

function TodoList(props: TodoListProps) {
  return (
    <>
      <Typography>
        Todos
      </Typography>
      <List>
        {
          map(props.list, (todo) => {
            return (
              <ListItem>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Typography>
                    {todo.details}
                  </Typography>
                  <Checkbox 
                    checked={todo.completed} 
                    onChange={
                      () => props.onUpdateTodo({...todo, ...{completed: !todo.completed}})
                    }
                  />
                  <IconButton 
                    aria-label="delete" 
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
    </>
  )
}

export default TodoList