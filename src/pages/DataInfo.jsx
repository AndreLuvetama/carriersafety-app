import React, { useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { Footer } from '../components/Footer'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as XLSX from 'xlsx';
import { Alert, Box, Button, Pagination, Stack, TextField, Tooltip } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { ChartsYAxis } from '@mui/x-charts';




export const DataInfo = () => {
  const [data, setData] = useState([])
  const [dataFile, setDataFile] = useState(null)
  const [error, setError] = useState(null)
  const [excelFile, setExcelFile] = useState(null)
  const [excelData, setExcelData] = useState(null);


  const handleFile =(e)=>{
    const fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
    const selectedFile = e.target.files[0];
 
    if(selectedFile){
      if(selectedFile&&fileTypes.includes(selectedFile.type)){
        setError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload=(e)=>{
          setExcelFile(e.target.result);
          setData(e.target.result)
        }
      }
      else{
        setError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else{
      console.log('Please select your file');
    }
  }

  const handleSubimitFile=(e)=>{
    e.preventDefault();
    console.log("cheguei")
    if(excelFile!==null){
      const workbook = XLSX.read(excelFile,{type: 'buffer'});
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data.slice(0,10));
    }
  }


  return (
    <>
    <HeaderComponent />
 

    <Box component="section" sx={{ p: 2}} display="flex" flexDirection="column" minHeight="10vh"  alignItems="center" justifyContent="center">
          <span>Data Info</span>
          <form onSubmit={handleSubimitFile} > 
              <TextField sx={{alignItems:"center"}} type='file'  name='file' placeholder='Choose the file' onChange={handleFile}/>
             <br /> <br />
             <Button variant="contained" type='submit' color='primary'>Upload</Button>
              {
                error &&(<Alert severity="error">{error}</Alert>)
              }
            </form>
        </Box>
         <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
         {
            excelData?( <div>
              <TableContainer >
              <Table sx={{ minWidth: 650, mt: 5 }} aria-label="simple table" component={Paper}>
              <TableHead>
                <TableRow>                  
                    { Object.keys(excelData[0]).map((key)=>(
                      <TableCell key={key}>{key} </TableCell>
                    ))}                 
                  
                </TableRow>
               </TableHead>
               <TableBody>  
                 { excelData.map((individualExcelData, index) =>(
                     <TableRow key={index}>
                     {Object.keys(individualExcelData).map((key)=>(
                         <TableCell key={key}>{individualExcelData[key]}</TableCell>
                       ))}
                     </TableRow>

                 ))

                 }
               </TableBody>
              </Table>
              <Stack spacing={2}>
          
                <Pagination count={10} variant="outlined" color="primary" />
           
              </Stack>
              </TableContainer>
              
              
              Data Show
              
              </div> ):(
                <div>No data </div>
            )}
         
         </Box>


          <Box>
          <BarChart
              series={[
                { data: [35, 44, 24, 34]  },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={290}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
          </Box>  


    <Footer/>
    </>
  )
}
