import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from '../services/api';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [workouts, setWorkouts] = useState([]);
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }

        const fetchData = async () => {
            try {
                const workoutResponse = await axios.get('/workouts');
                const goalResponse = await axios.get('/goals');
                setWorkouts(workoutResponse.data);
                setGoals(goalResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return (
            <Container>
                <Typography variant="h4" align="center" mt={5} sx={{ color: "#ffffff" }}>Loading...</Typography>
                <CircularProgress sx={{ display: 'block', margin: 'auto', marginTop: 2, color: "#ffffff" }} />
            </Container>
        );
    }

    return (
        <>
        <Typography variant="h4" mt={5} gutterBottom sx={{color:"#ffffff"}}>
                    Welcome, {user?.name}
                </Typography>
        <Container>
            <Box mt={5}>
                <Typography variant="h5" gutterBottom align="center" sx={{color:"#ffffff"}}>Recent Workouts</Typography>
                <Grid container spacing={3} justifyContent="center">
                    {workouts.length === 0 ? (
                        <Typography variant="body1" color="textSecondary" align="center" sx={{marginTop:"20px",color:"#ffffff"}}>No recent workouts found.</Typography>
                    ) : (
                        workouts.map((workout) => (
                            <Grid item xs={12} sm={6} md={4} key={workout._id}>
                                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                    <Card sx={{backgroundColor:"#f5426f"}}>
                                        <CardContent>
                                            <Typography sx={{color:"white"}} variant="h6">{workout.activity}</Typography>
                                            <Typography sx={{color:"white"}} >Duration: {workout.duration} mins</Typography>
                                            <Typography sx={{color:"white"}} >Calories Burned: {workout.caloriesBurned}</Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))
                    )}
                </Grid>

                <Typography variant="h5" gutterBottom align="center" mt={5} sx={{color:"#ffffff"}}>Your Goals</Typography>
                <Grid container spacing={3} justifyContent="center">
                    {goals.length === 0 ? (
                        <Typography variant="body1"  align="center" sx={{marginTop:"20px",color:"#ffffff"}}>No goals found.</Typography>
                    ) : (
                        goals.map((goal) => (
                            <Grid item xs={12} sm={6} md={4} key={goal._id}>
                                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                                    <Card sx={{backgroundColor:"#f5426f"}}>
                                        <CardContent>
                                            <Typography sx={{color:"white"}} variant="h6">Goal: {goal.goalType}</Typography>
                                            <Typography sx={{color:"white"}} >Progress: {goal.progress}</Typography>
                                            <Typography sx={{color:"white"}} >Time Frame: {goal.timeFrame}</Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </Container>
        </>
    );
};

export default Dashboard;
