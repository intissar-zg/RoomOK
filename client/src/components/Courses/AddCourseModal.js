import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal} from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux';
import { add_course } from '../../actions/courseAction';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '60ch',
      alignContent:'center'
    },
  },
  button :{
    width: '40ch',
    alignContent: 'right',
  },
  paper: {
    position: 'relative',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px  #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4,6, 2),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch()
  const [input, setInput] = useState(
    {
      Title:'',
      Description:'',
      Content:'',
    }
  )
  const id = useSelector(state => state.authReducer.user._id)
  const handleChange = (e) => {
    setInput({...input,[e.target.name]:e.target.value});
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add_course(input,id));
    handleClose();
  }
  
  return (
    <div>
      <Button type="button" onClick={handleOpen} variant="contained" color="primary" >
        Add Course
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        
    <div style={modalStyle} className={classes.paper}>
     <div>
     <h2 style={{textAlign:'center'}}>Add new course</h2><br/>
     
      </div>
      <form className={classes.root} noValidate autoComplete="off" style={{textAlign:'center'}}>
      <TextField name="Title" label="Title" variant="outlined" onChange={handleChange}/><br/>
      <TextField name="Description" label="Description" variant="outlined" onChange={handleChange} /><br/>
      <TextField name="Content" label="Content" multiline rows={4} variant="outlined" onChange={handleChange} /><br/>
      
      <Button className={classes.button} type='submit' onClick={handleSubmit} variant="contained" color="primary">Add</Button>
    </form>
    </div>
    
    </Modal>
    </div>
  );
}