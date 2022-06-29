import { List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { User } from '../@types';
import map from 'lodash/map'
import { Box } from '@mui/system';

interface TodoListProps {
  list: User[]
  onAddUser: (user: User) => void
}

function UserList(props: TodoListProps) {
  return (
    <>
      <Typography>
        Users
      </Typography>
      <List>
        {
          map(props.list, (user) => {
            return (
              <ListItem>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                  <Typography>
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                </Box>
              </ListItem>
            )
          })
        }
      </List>
    </>
  )
}

export default UserList