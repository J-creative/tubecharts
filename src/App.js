import './App.css';
import BasicTable from './BasicTable';
import Chips from './Chips';
import MainTable from './MainTable';
import PrimarySearchAppBar from './PrimarySearchAppBar';


function App() {
  return (
    <div className="App">
    <PrimarySearchAppBar/>
    <Chips/>
    <BasicTable/>
    </div>
  );
}

export default App;
