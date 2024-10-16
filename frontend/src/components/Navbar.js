import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
    AppBar,
    Toolbar,
    Button,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
    margin: '0 10px',
});

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const isMobile = useMediaQuery('(max-width:600px)');
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    const navButtons = (
        <>
            {user && user.role === 'admin' && (
                <StyledButton
                    component={Link}
                    to="/admin"
                    sx={{
                        color: location.pathname === '/admin' ? '#1976d2' : 'inherit',
                    }}
                >
                    Admin
                </StyledButton>
            )}
            <StyledButton
                component={Link}
                to="/"
                sx={{
                    color: location.pathname === '/' ? '#1976d2' : 'inherit',
                }}
            >
                Dashboard
            </StyledButton>
            <StyledButton
                component={Link}
                to="/workouts"
                sx={{
                    color: location.pathname === '/workouts' ? '#1976d2' : 'inherit',
                }}
            >
                Workouts
            </StyledButton>
            <StyledButton
                component={Link}
                to="/goals"
                sx={{
                    color: location.pathname === '/goals' ? '#1976d2' : 'inherit',
                }}
            >
                Goals
            </StyledButton>
            <Button color="inherit" onClick={logout}>
                Logout
            </Button>
        </>
    );

    const mobileNav = (
        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
            <List sx={{backgroundColor:"#f5426f",height:"100vh"}}>
                {user && user.role === 'admin' && (
                    <ListItem button component={Link} to="/admin">
                        <ListItemText primary="Admin" />
                    </ListItem>
                )}
                <ListItem button component={Link} to="/">
                    <ListItemText primary="Dashboard" sx={{color:"#ffffff"}} />
                </ListItem>
                <ListItem button component={Link} to="/workouts">
                    <ListItemText primary="Workouts" sx={{color:"#ffffff"}} />
                </ListItem>
                <ListItem button component={Link} to="/goals">
                    <ListItemText primary="Goals" sx={{color:"#ffffff"}} />
                </ListItem>
                <ListItem button onClick={logout}>
                    <ListItemText primary="Logout" sx={{color:"#ffffff"}} />
                </ListItem>
            </List>
        </Drawer>
    );

    return (
        <AppBar position="static" sx={{ backgroundColor: '#f5426f' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Fitness Tracker
                </Typography>
                {user ? (
                    isMobile ? (
                        <>
                            <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                                <MenuIcon />
                            </IconButton>
                            {mobileNav}
                        </>
                    ) : (
                        navButtons
                    )
                ) : (
                    <>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/signup">
                            Sign Up
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
