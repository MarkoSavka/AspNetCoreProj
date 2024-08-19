import { useEffect, useState } from 'react';
import { useAuth } from '../../app/jwt/useAuth';
import { Container, Button, Box, Typography, Paper, Grid } from '@mui/material';
import axios from 'axios'; // Assuming you are using axios for API calls
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface User {
    id: string; // Ensure the User interface has an id property
    username: string;
    email?: string;
    role: string;
    phoneNumber?: string;
    password?: string;
    // Add other user properties if needed
}

export default function HomePage() {
    const { decodedToken } = useAuth();
    const [user, setUser] = useState<User | null>(null);
    const [users, setUsers] = useState<User[]>([]); // State for list of users
    const navigate = useNavigate();

    useEffect(() => {
        if (decodedToken) {
            console.log("decodedToken:", decodedToken);
            const user: User = {
                id: decodedToken.id, // Ensure the decodedToken has an id property
                username: decodedToken.unique_name, 
                email: decodedToken.email,
                role: decodedToken.role,
                phoneNumber: decodedToken.phoneNumber,
                password: decodedToken.password,
                // Map other properties if needed
            };
            setUser(user);
        }

        // Fetch users from the database
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('jwtToken');
                const response = await axios.get('http://localhost:5299/gateway/user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
                
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, [decodedToken]);

    const handleEdit = (user: User) => {
        navigate('/edit', { state: { user } });
    };

    const handleDelete = async (user: User) => {
        Swal.fire({
            title: 'Are you sure?',
            text: `Do you really want to delete user ${user.username}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(`Delete user: ${user.username}`);
                const token = localStorage.getItem('jwtToken');
                try {
                    const response = await axios.delete(
                        `http://localhost:5299/gateway/admin/${user.id}`, 
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'User deleted successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    // Update the users state to remove the deleted user
                    setUsers(users.filter(u => u.id !== user.id));
                } catch (error) {
                    console.error('Error deleting user:', error);
                    Swal.fire({
                        title: 'Error',
                        text: 'You do not have permission to perform this action',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            }
        });
    };

    const handleAddUser = async () => {
        navigate('/add');
    };
    
    return (
        <Box>
            <Box component="nav" sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
                <Button sx={{ marginRight: 1 }} variant="contained" color="success" onClick={() => window.location.href = '/login'}>Login</Button>
                <Button variant="contained" color="success" onClick={() => window.location.href = '/register'}>Register</Button>
            </Box>
            <Container>
                {user ? (
                    <Paper elevation={3} sx={{ padding: '1rem', marginBottom: '2rem' }}>
                        <Typography variant="h3">Welcome, {user.username}!</Typography>
                        {user.email && <Typography>Email: {user.email}</Typography>}
                        <Typography>Role: {user.role}</Typography>
                    </Paper>
                ) : (
                    <Typography>Loading user information...</Typography>
                )}
                <Box sx={{ marginBottom: 100 }}>
                    <Typography variant="h4" gutterBottom>Users</Typography>
                    <Button variant="contained" color="primary" onClick={handleAddUser} sx={{ marginBottom: '1rem' }}>Add New User</Button>
                    {users.map((user) => (
                        <Paper key={user.id} elevation={1} sx={{ padding: '1rem', marginBottom: '1rem' }}>
                            <Grid container alignItems="center">
                                <Grid item xs={12} sm={8}>
                                    <Typography>Username: {user.name}</Typography>
                                    <Typography>Email: {user.email}</Typography>
                                    <Typography>Role: {user.role}</Typography>
                                    <Typography>Phone Number: {user.phoneNumber}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(user)} sx={{ marginRight: '1rem' }}>Edit</Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user)}>Delete</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}