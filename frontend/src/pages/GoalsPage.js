import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { Container, List, ListItem, ListItemText, Typography, Box, Button, Paper } from '@mui/material';
import GoalForm from '../components/GoalForm';

const GoalsPage = () => {
    const [goals, setGoals] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentGoal, setCurrentGoal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('/goals');
            setGoals(response.data);
        };
        fetchData();
    }, []);

    const handleAddGoal = () => {
        setCurrentGoal(null);
        setShowForm(true);
    };

    const handleEditGoal = (goal) => {
        setCurrentGoal(goal);
        setShowForm(true);
    };

    const handleDeleteGoal = async (id) => {
        try {
            await axios.delete(`/goals/${id}`);
            const response = await axios.get('/goals');
            setGoals(response.data);
        } catch (error) {
            console.error('Error deleting goal', error);
        }
    };

    const handleFormSuccess = async () => {
        setShowForm(false);
        const response = await axios.get('/goals');
        setGoals(response.data);
    };

    return (
        <Container>
            <Box mt={5}>
                <Typography variant="h4" align="center" sx={{ color: "#ffffff" }}>Your Goals</Typography>
                <Button variant="contained" sx={{ backgroundColor: "#f5426f" }} onClick={handleAddGoal}>
                    Add Goal
                </Button>
                {showForm && (
                    <GoalForm initialData={currentGoal} onSuccess={handleFormSuccess} />
                )}
                <Paper elevation={3} style={{ padding: '16px', marginTop: '16px', backgroundColor: "#425df5" }}>
                    <List>
                        {
                            goals.length === 0 ? (
                                <Typography variant="body1" color="white" align="center" sx={{ marginTop: "20px" }}>No recent goals found.</Typography>
                            ) : (
                                goals.map((goal) => (
                                    <ListItem key={goal._id} sx={{borderBottom:"2px solid black"}}>
                                        <ListItemText
                                            primaryTypographyProps={{ style: { color: 'white' } }}
                                            secondaryTypographyProps={{ style: { color: 'white' } }}
                                            primary={`Goal Type: ${goal.goalType}`}
                                            secondary={`Target Value: ${goal.targetValue}, Time Frame: ${goal.timeFrame}`}
                                        />

                                        <Box>
                                            <Button variant="outlined" sx={{ color: "white", backgroundColor: "green" }} onClick={() => handleEditGoal(goal)} style={{ marginRight: '8px' }}>
                                                Edit
                                            </Button>
                                            <Button variant="outlined" sx={{ backgroundColor: "white", color: "black" }} onClick={() => handleDeleteGoal(goal._id)}>
                                                Delete
                                            </Button>
                                        </Box>
                                    </ListItem>
                                )
                                ))}
                    </List>
                </Paper>
            </Box>
        </Container>
    );
};

export default GoalsPage;
