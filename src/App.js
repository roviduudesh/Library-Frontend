import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import BasicTable from './BasicTable';
import Loader from './Loader';



function App() {

  const[loading, setLoading] = useState(false);

  return (

    <>
      <Loader
            loading = {loading}
      />
      <BasicTable
        setLoading = {setLoading}
      />
    </>
    // <div className="App">
    //   <BasicTable></BasicTable>
    // </div>
  );
}

export default App;
