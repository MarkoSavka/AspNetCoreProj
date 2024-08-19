import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, MenuItem } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AddPage() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
    phoneNumber: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.post(
        `http://localhost:5299/gateway/admin/create`, 
        user, 
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      Swal.fire({
        title: 'Success!',
        text: 'User added successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      // Redirect or show success message
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        Swal.fire({
          title: 'Forbidden',
          text: 'You do not have permission to perform this action',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        console.error('Error adding user:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while adding the user',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
    navigate('/');
  };

  return (
    <Container>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={user.role}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
        >
          <MenuItem value="Administrator">Administrator</MenuItem>
          <MenuItem value="User">User</MenuItem>
        </TextField>
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={user.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}