import { Container, CssBaseline, ThemeProvider } from '@material-ui/core';
import './App.css';
import BasicTable from './BasicTable';
import Chips from './Chips';
import MainTable from './MainTable';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import { createMuiTheme } from '@material-ui/core/styles';
import MyDrawer from './Drawer';
import { useState } from 'react';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff3333',
      main: '#FF0000',
      dark: '#b20000',
      contrastText: '#282828',
    },
    secondary: {
      light: '#535353',
      main: '#282828',
      dark: '1c1c1c',
      contrastText: '#fefefe',
    },
    background:{
      default: '#3d3d3d',
      paper: '#fdfdfd'
    },
  },
});


function App() {
  const [drawOpen, setDrawOpen] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const[menuDirection, setMenuDirection] = useState('left');

const[tagList,setTagList]= useState(['40s','50s','60s','70s','80s','90s','00s','10s','rock'])

  const toggleDrawer = (anchor, open) => (event) => {
    console.log('clicked', anchor, open)
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      console.log('returned')

      return;

    }
    console.log('opendraw')

    setDrawOpen({ ...drawOpen, [anchor]: open });
  };

  return (
    <div className="App">
 <ThemeProvider theme={theme}>
 <CssBaseline/>
      <MyDrawer drawOpen ={drawOpen} setDrawOpen={setDrawOpen} toggleDrawer={toggleDrawer} menuDirection={menuDirection} />
    <PrimarySearchAppBar drawOpen ={drawOpen} setDrawOpen={setDrawOpen} toggleDrawer={toggleDrawer} menuDirection={menuDirection}/>
      <Container maxWidth="md">
      <Chips/>
      <BasicTable/>
      </Container>
   </ThemeProvider>
    </div>
  );
}

export default App;
