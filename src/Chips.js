
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { useEffect, useState } from 'react';
import { db } from './fire'
import { Refresh } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Chips({ tagList,setTagList,rows,setRows}) {
  const classes = useStyles();

  useEffect(()=>{ 
  db.collection('tags')
  .orderBy('count', 'desc').limit(30).get()
  .then( function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
     setTagList(tagList => [...tagList, doc.data().name]);
     console.log('dis', doc.data())
}) 
console.log('data',rows);
  }).catch((err)=>console.log(err,'there was an error'))
},[])

const reset = ()=>{
  setRows(rows => []);
  db.collection('main').orderBy('rank').limit(30).get()
  .then( function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
     setRows(rows => [...rows, doc.data()]);
     console.log('dis', doc.data())
}) 
console.log('data',rows);
  }).catch((err)=>console.log(err,'there was an error'))
}

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = (tag) => (event) => {
    console.info('You clicked the Chip.',tag);
    setRows(rows => [])
    if(tag.match(/\d0s/g,)){

      db.collection('main').where("decade", "==", tag)
      .orderBy('rank').limit(30).get()
      .then( function(querySnapshot) {
  
        querySnapshot.forEach(function(doc) {
         setRows(rows => [...rows, doc.data()]);
         console.log('dis', doc.data())
  }) 
  console.log('data',rows);
      }).catch((err)=>console.log(err,'there was an error'))

}
else{
  
  db.collection('main').where("tags", "array-contains", tag)
  .orderBy('rank').limit(30).get()
  .then( function(querySnapshot) {

    querySnapshot.forEach(function(doc) {
     setRows(rows => [...rows, doc.data()]);
     console.log('dis', doc.data())
}) 
console.log('data',rows);
  }).catch((err)=>console.log(err,'there was an error'))
}

  };

  return (
    <div className={classes.root}>
    {tagList.map((tag)=> (
      <Chip key={tag}  label={tag} onClick={handleClick(tag)} />
    ))}
    <Chip
        
        label="Refresh"
        clickable
        color="primary"
        onClick={reset}
        icon={<Refresh/>}
      />
    </div>
  );
}
