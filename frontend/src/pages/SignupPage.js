import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { TextField, Button, Container, Typography, Box, Paper, Divider, Grid, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

const SignupPage = () => {
    const { signup } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(name, email, password);
            navigate('/login');
        } catch (error) {
            console.error('Signup failed', error);
            setError('Signup failed. Please try again.');
        }
    };

    // Styled components for better customization
    const StyledButton = styled(Button)(({ theme }) => ({
        borderRadius: '30px',
        fontWeight: 'bold',
        padding: '12px',
        fontSize: '16px',
        textTransform: 'none',
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    }));

    const ResponsiveContainer = styled(Container)(({ theme }) => ({
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #ffafbd, #ffc3a0)',
        [theme.breakpoints.down('sm')]: {
            padding: '20px',
        },
    }));

    return (
        <ResponsiveContainer maxWidth="sm">
            <Paper
                elevation={10}
                sx={{
                    padding: '40px',
                    borderRadius: '20px',
                    maxWidth: '450px',
                    width: '100%',
                    boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Box textAlign="center" mb={4}>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        Create Your Account
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Get started with your fitness journey!
                    </Typography>
                </Box>

                <Divider sx={{ marginBottom: '30px' }} />

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                fullWidth
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                InputProps={{
                                    sx: { borderRadius: '12px' },
                                }}
                                sx={{ backgroundColor: '#f9f9f9' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                InputProps={{
                                    sx: { borderRadius: '12px' },
                                }}
                                sx={{ backgroundColor: '#f9f9f9' }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                fullWidth
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                InputProps={{
                                    sx: { borderRadius: '12px' },
                                }}
                                sx={{ backgroundColor: '#f9f9f9' }}
                            />
                        </Grid>

                        {error && (
                            <Grid item xs={12}>
                                <Typography variant="body2" color="error" align="center">
                                    {error}
                                </Typography>
                            </Grid>
                        )}

                        <Grid item xs={12}>
                            <StyledButton
                                type="submit"
                                variant="contained"
                                fullWidth
                                disableElevation
                            >
                                Sign Up
                            </StyledButton>
                        </Grid>
                    </Grid>
                </form>

                <Box textAlign="center" mt={3}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link href="/login" color="primary" underline="hover">
                            Login
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </ResponsiveContainer>
    );
};

export default SignupPage;
