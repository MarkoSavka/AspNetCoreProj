import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, MenuItem, Container } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

interface User {
  name: string;
  email?: string;
  role: string;
  phoneNumber?: string;
  password?: string;
  // Add other user properties if needed
}

export default function EditPage() {
  const location = useLocation();
  const user = location.state?.user as User;
  const navigate = useNavigate();

  const [editedUser, setEditedUser] = useState<User>(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(
        `http://localhost:5299/gateway/admin/${user.id}`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('User updated successfully:', response.data);
      Swal.fire({
        title: 'Success',
        text: 'User updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        Swal.fire({
          title: 'Forbidden',
          text: 'You do not have permission to perform this action',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      } else {
        console.error('Error updating user:', error);
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while updating the user',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const handleBack = async () => {
    navigate('/');
  };

  if (!user) {
    return <p>No user selected for editing.</p>;
  }

  return (
    <Container>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="name"
          value={editedUser.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <TextField
          label="Email"
          name="email"
          value={editedUser.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Role"
          name="role"
          value={editedUser.role}
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
          value={editedUser.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button
          onClick={handleBack}
          type="button"
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          type="submit"
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