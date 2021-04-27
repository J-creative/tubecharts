import { db } from '../src/fire';


fetch("./employees.json")
.then(response => {
   return response.json();
})
.then(data => console.log(data));

