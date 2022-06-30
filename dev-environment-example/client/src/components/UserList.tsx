import { Divider, IconButton, Input, List, ListItem, Typography } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { User } from '../@types';
import AddIcon from '@mui/icons-material/Add';
import map from 'lodash/map'
import { Box } from '@mui/system';

interface TodoListProps {
  list: User[]
  onAddUser: (user: User) => void
}

function UserList(props: TodoListProps) {
  const [newUser, setNewUser] = useState<User>({first_name: '', last_name: '', email: ''})

  const handleAddUser = useCallback(() => {
    props.onAddUser(newUser)
    setNewUser({first_name: '', last_name: '', email: ''})
  }, [props, newUser])

  return (
    <Box sx={{ padding: '45px', display: 'flex', flexShrink: 1, flexDirection: 'column', alignItems: 'top', justifyContent: 'center'}}>
      <Typography>
        Add User
      </Typography>      
      <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Input 
          sx={{margin: '4px'}}
          placeholder='First Name' 
          onChange={e => setNewUser({...newUser, ...{first_name: e.target.value}})} 
          value={newUser.first_name}/>
        <Input 
          sx={{margin: '4px'}}
          placeholder='Last Name' 
          onChange={e => setNewUser({...newUser, ...{last_name: e.target.value}})} 
          value={newUser.last_name}/>
        <IconButton sx={{margin: '4px'}} onClick={handleAddUser}>
          <AddIcon />
        </IconButton>
      </Box>
      <Divider sx={{margin: '8px'}}/>
      <Typography>
        Users
      </Typography>
      <List>
        {
          map(props.list, (user) => {
            return (
              <ListItem key={user.id}>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <Typography>
                    {`${user.first_name} ${user.last_name}`}
                  </Typography>
                </Box>
              </ListItem>
            )
          })
        }
      </List>
    </Box>
  )
}

export default UserList