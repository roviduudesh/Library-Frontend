import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import Notification from './Notification';
import MaterialTable from 'material-table';

export default function BasicTable(props) {

  const {setLoading} = props;
  const [records, setRecords] = useState([]);
  const [notify, setNotify] = useState({isOpen:false, message:'', type:''});
  const [selectedRow, setSelectedRow] = useState(null);

  const headCells = [
    {field: 'copyrightDate', title:'Copyright Date'},
    {field: 'biblioNumber', title:'Biblio Number'},
    {field: 'author', title:'Author'},
    {field: 'isbn', title:'ISBN'},
    {field: 'title', title:'Title'},
    {field: 'type', title:'Type'},
    {field: 'subject', title:'Subject(s)'},
]

  useEffect(() => {
    setLoading(true);
    // console.log('USER')
    axios.get("http://localhost:8080/api/v1/book/details")
    .then((function (response){
        console.log("response.data", response.data)
        setRecords(response.data.data)
        
        let type = response.data.status == 200 ? 'success' : 'error';               
        notification(true, response.data.message, type);
        setLoading(false);
    }))
  }, []);

  const notification = (open, message, type) =>{
    setNotify({
        isOpen: open,
        message: message,
        type: type
    })
  } 

  return (
    <>
        <div style={{textAlign: 'center', fontFamily: 'Garamond', textDecoration: 'underline'}}><h1>Bibliographic Details</h1></div>
        <MaterialTable 
          style={{backgroundColor: 'white'}}
          columns={headCells}
          data={records}      
          onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}            
          options={{
            grouping: true,
            showTitle:false,
            filtering: true,
            selection: true,
            exportButton: true,
            rowStyle: rowData => ({
              // backgroundColor: (selectedRow === rowData.tableData.id) ? '#F5F5F5' : 'white',
              color: (selectedRow === rowData.tableData.id) ? 'red' : 'black',
              // color: 'black',
              fontFamily: 'Garamond',
              // fontSize: '15px',
              fontWeight: 'bold'
            }),

            headerStyle:({
              backgroundColor: '#D10A0A',
              fontSize: '20px',
              fontFamily: 'Garamond',
              fontWeight: 'bold',
              color: 'white',
            }),
            
            searchFieldStyle:({
              backgroundColor: '#F5F5F5',              
              fontSize: '20px',
              fontFamily: 'Garamond',
              fontWeight: 'bold',
              color: 'black'
            }),

            
          }}
        />
      
      </>
  );
}
