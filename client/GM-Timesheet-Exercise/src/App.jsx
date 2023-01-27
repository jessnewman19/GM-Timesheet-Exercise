import { useEffect, useState } from 'react';
import Table from './Table';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  //Fetch data on initial render 
  useEffect(() => { 
    const fetchData = async () => { 
      const response = await fetch("http://localhost:4000/");
      const json = await response.json();
      setData(json);
    }
    try { 
      fetchData();
    } catch (error) { 
      //Implement error handling here
      console.log(error);
    }
  },[])

  return (
    <div className="App">
      <Table data={data.data}/>
    </div>
  )
}

export default App
