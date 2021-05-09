import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';
import { db } from './fire'

function abbreviateNumber (value) { //slight ammendment of chucktator's function from stackOverflow
  var suffixes = ["", "K", "M", "B","T"];
  var suffixNum = Math.floor(((""+value).length-1)/3);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(3));
  if (shortValue % 1 != 0) {
      shortValue = shortValue.toFixed(1);
  }
  return shortValue+suffixes[suffixNum];
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable({rows,setRows}) {
  const classes = useStyles();


useEffect(()=>{
        db.collection('main').orderBy('rank').limit(30).get()
        .then( function(querySnapshot) {
    
          querySnapshot.forEach(function(doc) {
           setRows(rows => [...rows, doc.data()]);
           console.log('dis', doc.data())
    }) 
    console.log('data',rows);
        }).catch((err)=>console.log(err,'there was an error'))
},[])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Artist</TableCell>
            <TableCell align="left">Song</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">Score</TableCell>
            <TableCell align="right">Views</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.artist}
              </TableCell>
              <TableCell align="left">{row.song}</TableCell>
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.score.toFixed(2)}</TableCell>
              <TableCell align="right">{abbreviateNumber(row.views)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}