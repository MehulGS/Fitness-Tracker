import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions } from '@mui/material';
import WorkoutForm from '../components/WorkoutForm';
import { motion } from 'framer-motion';

const WorkoutsPage = () => {
    const [workouts, setWorkouts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentWorkout, setCurrentWorkout] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/workouts');
            setWorkouts(response.data);
        };
        fetchData();
    }, []);

    const handleAddWorkout = () => {
        setCurrentWorkout(null);
        setShowForm(true);
    };

    const handleEditWorkout = (workout) => {
        setCurrentWorkout(workout);
        setShowForm(true);
    };

    const handleDeleteWorkout = async (id) => {
        try {
            await axios.delete(`/workouts/${id}`);
            const response = await axios.get('/workouts');
            setWorkouts(response.data);
        } catch (error) {
            console.error('Error deleting workout', error);
        }
    };

    const handleFormSuccess = async () => {
        setShowForm(false);
        const response = await axios.get('/workouts');
        setWorkouts(response.data);
    };

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" align="center" gutterBottom sx={{color:"#ffffff"}}>Your Workouts</Typography>
                <Button variant="contained" sx={{backgroundColor:"#f5426f"}} onClick={handleAddWorkout}>
                    Add Workout
                </Button>
                {showForm && (
                    <WorkoutForm initialData={currentWorkout} onSuccess={handleFormSuccess} />
                )}
                <Grid container spacing={3} mt={3} justifyContent="center">
                    {workouts.map((workout) => (
                        <Grid item xs={12} sm={6} md={4} key={workout._id}>
                            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                <Card sx={{backgroundColor:"#f5426f"}}>
                                    <CardContent>
                                        <Typography variant="h6" sx={{color:"#ffffff"}}>{workout.activity}</Typography>
                                        <Typography sx={{color:"#ffffff"}}>Duration: {workout.duration} mins</Typography>
                                        <Typography sx={{color:"#ffffff"}}>Calories Burned: {workout.caloriesBurned}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="outlined" sx={{backgroundColor:"green",color:"white"}} onClick={() => handleEditWorkout(workout)}>
                                            Edit
                                        </Button>
                                        <Button variant="outlined" sx={{backgroundColor:"#ffffff",color:"black"}} onClick={() => handleDeleteWorkout(workout._id)}>
                                            Delete
                                        </Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default WorkoutsPage;
