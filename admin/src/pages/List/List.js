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
import Button from '@mui/material/Button';

function List() {
    const url = "http://localhost:4000";
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/car/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error fetching list");
            }
        } catch (error) {
            toast.error("Error fetching list");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    const removeCar = async (carId) => {
        try {
            const response = await axios.post(`${url}/api/car/remove`, { id: carId });
            if (response.data.success) {
                toast.success(response.data.message);
                fetchList(); // Fetch the updated list after showing the toast
            } else {
                toast.error("Error removing car");
            }
        } catch (error) {
            toast.error("Error removing car");
        }
    };

    return (
        <div>
            <ToastContainer />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="car list table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Body Type</TableCell>
                            <TableCell>Top Speed</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    <img src={`${url}/image/` + item.image} style={{ width: "150px", height: "150px" }} alt={item.name} />
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.bodytype}</TableCell>
                                <TableCell>{item.topspeed}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" onClick={() => removeCar(item._id)}>
                                        Remove
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default List;
