import { useEffect, useState } from 'react';
import Table from './Table';
import Loading from './Loading';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null)
  const [loading, setIsLoading] = useState(true);

  //Fetch data on initial render 
  useEffect(() => { 
    const fetchData = async () => { 
      try { 
        const response = await fetch("http://localhost:400/");
        if (response.status === 500) {
          //Will display the error in the console
          throw new Error("Could not retrieve data from the database");
        } else { 
          const json = await response.json();
          setData(json);
        }
      } catch (error) { 
        setError(error.message)
    }
  };
  fetchData();
  },[]);

  return (
    <div className="App">
      {error && <p>{error}</p>}
      {loading ? <Loading setIsLoading={setIsLoading}/> : <Table data={data.data}/>}
    </div>
  )
}

export default App