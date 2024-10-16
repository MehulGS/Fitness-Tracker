import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box, Paper, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (error) {
            console.error('Login failed', error);
            setError('Invalid email or password');
        }
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    padding: '30px',
                    borderRadius: '16px',
                    maxWidth: '400px',
                    width: '100%',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    backgroundColor:"#f5426f"
                }}
            >
                <Box textAlign="center" mb={3}>
                    <Typography variant="h4" fontWeight="bold" sx={{color:"white"}} >
                        Welcome Back
                    </Typography>
                    <Typography variant="body1" sx={{color:"white"}}>
                        Please login to your account
                    </Typography>
                </Box>

                <Divider sx={{ marginBottom: '20px' }} />

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        variant="outlined"
                        sx={{
                            borderRadius: '10px',
                            backgroundColor: '#f0f0f0',
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        sx={{
                            borderRadius: '10px',
                            backgroundColor: '#f0f0f0',
                        }}
                    />

                    {error && (
                        <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                            marginTop: '20px',
                            padding: '12px',
                            borderRadius: '25px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                        }}
                    >
                        Login
                    </Button>
                </form>

                <Box textAlign="center" mt={2}>
                    <Typography variant="body2"sx={{color:"white"}} >
                        Don't have an account?{' '}
                        <Button href="/signup"  sx={{ fontWeight: 'bold' ,color:"green"}}>
                            Sign Up
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default LoginPage;
