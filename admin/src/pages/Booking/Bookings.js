import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';

function Bookings() {
    const url = "https://newcar-vem1.onrender.com"; 
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/book/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching list");
            }
        } catch (error) {
            toast.error("Error fetching list");
        }
    };

   
    
    const statusHandler = async (event, bookingId) => {
        try {
            const response = await axios.post(url + "/api/book/status", {
                bookingId,
                status: event.target.value
            });
            if (response.data.success) {
                fetchList();
                // Fetch the updated list
            } else {
                toast.error("Error updating status");
            }
        } catch (error) {
            toast.error("Error updating status: " + error.message);
        }
    };
    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div>
            <ToastContainer />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="car list table">
                    <TableHead>
                        <TableRow >
                            <TableCell><b>Product Name</b></TableCell>
                            <TableCell><b>Price</b></TableCell>
                            <TableCell><b>Email</b></TableCell>
                            <TableCell><b>contact</b></TableCell>
                            <TableCell><b> Booking Status</b></TableCell>
                       

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((item) => (
                            <TableRow key={item._id}
                            sx={{
                                backgroundColor: item.status === 'car delivered' ? '#e0f7fa' : 'inherit',
                            }}>
                                <TableCell>
                                    {item.items.length > 0 ? item.items[0].name : 'No items'}
                                </TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.userdata?.email}</TableCell>
                                <TableCell>{item.userdata?.phone}</TableCell>
                                <TableCell>
                                    <FormControl   >
                                        <Select
                                            value={item.status}
                                            onChange={(event) => statusHandler(event, item._id)}
                                            sx={{ 
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                }
                                            }}
                                            
                                            
                                        >    
                                            <MenuItem value="car booked">Car Booked</MenuItem>
                                            <MenuItem value="car delivered">Car Delivered</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TableCell>
                                
                             
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Bookings;
