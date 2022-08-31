/* eslint-disable react/destructuring-assignment */
import * as React from 'react';
// eslint-disable-next-line no-unused-vars
import ImageUploader from 'react-images-upload';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Box, Card, CircularProgress, Button,
} from '@mui/material';

import { Icon } from '@iconify/react';
import emailIcon from '@iconify/icons-dashicons/email';
import accountIcon from '@iconify/icons-mdi/account';
import { updatePhoto } from 'src/api/auth';
import { useDispatch } from 'react-redux';
import { updateUser } from 'src/app/auth-slice';
import Editform from './editform';

export default function ProfileCard({ user }) {
  const [editMode, setEditMode] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const dispatch = useDispatch();

  const cancelEdit = () => setEditMode(false);

  if (!user) {
    return <CircularProgress />;
  }
  const onEdit = () => {
    setEditMode(true);
  };

  const onChange = (event) => {
    setUploading(true);
    updatePhoto(event.target.files[0])
      .then((response) => {
        dispatch(updateUser({ user: response }));
        setUploading(false);
      });
  };

  return (
    <Card sx={{
      display: 'flex', justifyContent: 'center', textAlign: 'start', padding: 10,
    }}
    >
      <Box sx={{ marginLeft: 20 }}>
        <CardMedia
          component="img"
          height="350px"
          style={{
            width: 250,
            marginBottom: 20,

          }}
          image={user.picture}
          alt="green iguana"
        />
        { uploading
          ? <CircularProgress /> : (
            <input type="file" onChange={onChange} />
          ) }
      </Box>
      { editMode ? (
        <Editform user={user} cancelEdit={cancelEdit} />
      ) : (
        <Box sx={{ margin: 5 }}>
          <Typography gutterBottom variant="h5" component="div">
            User details ..
          </Typography>

          <Typography gutterBottom variant="h6" color="text.secondary" component="div">
            { `Name : ${user?.first_name} ${user?.last_name}`}
          </Typography>
          <Typography gutterBottom variant="h6" color="text.secondary" component="div">
            <Icon icon={accountIcon} />
            { ` username : ${user.username}`}
          </Typography>

          <Typography variant="h6" color="text.secondary" marginBottom={5}>
            <Icon icon={emailIcon} />
            {` Email : ${user.email}`}
          </Typography>
          <Button variant="outlined" onClick={onEdit}>Edit</Button>
        </Box>

      ) }

    </Card>
  );
}
