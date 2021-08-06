import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { CardHeader, IconButton } from '@material-ui/core';
import {useDispatch} from 'react-redux' ;


const useStyles = makeStyles({
  root: {
    height: 200,
    width: 250,
  },
  media: {
    height: 140,
  },
});

export default function CoursesCard({course}) {
  const classes = useStyles();
  const dispatch = useDispatch()

  return (
    <Card className={classes.root} elevation={3}>
      <CardHeader  title = {course.Title} 
    
      />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
           {course.Description}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          <a rel="Courses Content" href={course.Content} target="_blank">Content {course.Title} </a>
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          By {course.owner.firstname}
          </Typography>
        </CardContent>
        
    </Card>
  );
}