import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useSelector } from 'react-redux';

export const NavBar = () => {
    const { user } = useSelector(store => store.auth);
    const [anchorElSignUp, setAnchorElSignUp] = useState(null);
    const [anchorElLogin, setAnchorElLogin] = useState(null);
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

    const openSignUp = Boolean(anchorElSignUp);
    const openLogin = Boolean(anchorElLogin);
    const openProfile = Boolean(anchorElProfile);

    const handleSignUpClick = (event) => {
        setAnchorElSignUp(event.currentTarget);
    };

    const handleLoginClick = (event) => {
        setAnchorElLogin(event.currentTarget);
    };

    const handleProfileClick = (event) => {
        setAnchorElProfile(event.currentTarget);
    };

    const handleSignUpClose = () => {
        setAnchorElSignUp(null);
    };

    const handleLoginClose = () => {
        setAnchorElLogin(null);
    };

    const handleProfileClose = () => {
        setAnchorElProfile(null);
    };

    const handleLogoutClick = () => {
        setOpenLogoutDialog(true);
        handleProfileClose();
    };

    const handleLogoutConfirm = () => {
        // Perform logout action here
        console.log("User logged out");
        setOpenLogoutDialog(false);
    };

    const handleLogoutCancel = () => {
        setOpenLogoutDialog(false);
    };

    return (
        <div className='bg-[#0B2F9F]'>
            <div className='max-w-7xl p-2 mx-auto flex justify-between'>
                <Link to="/">
                    <div className='flex justify-start items-center'>
                        <span className='w-11 h-11'>
                            <img className='w-full h-full' src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/BMS_College_of_Engineering.svg/800px-BMS_College_of_Engineering.svg.png" alt="" />
                        </span>
                        <h1 className='text-4xl font-extrabold rounded-md p-2 pb-4 text-[white]'>BMS<span className='text-[white]'>CE</span></h1>
                    </div>
                </Link>
                {
                    user ? (
                        <div>
                            <div id="profile" className='flex items-center mt-3'>
                                <Avatar
                                    src="/broken-image.jpg"
                                    onClick={handleProfileClick}
                                    style={{ cursor: 'pointer', border: '2px solid white' }}
                                />
                            </div>
                            <Menu
                                id="profile-menu"
                                anchorEl={anchorElProfile}
                                open={openProfile}
                                onClose={handleProfileClose}
                                MenuListProps={{
                                    'aria-labelledby': 'profile-button',
                                }}
                            >
                                <MenuItem onClick={handleProfileClose}>
                                    <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                        <PersonIcon style={{ marginRight: '8px' }} />
                                        My Profile
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleLogoutClick}>
                                    <LogoutIcon style={{ marginRight: '8px' }} />
                                    Logout
                                </MenuItem>
                            </Menu>
                            <Dialog
                                open={openLogoutDialog}
                                onClose={handleLogoutCancel}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">
                                    {"Confirm Logout"}
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        Are you sure you want to log out?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleLogoutCancel}>Cancel</Button>
                                    <Button onClick={handleLogoutConfirm} autoFocus>
                                        Logout
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Button id="signup" variant="contained" onClick={handleSignUpClick}>Sign Up</Button>
                            <Menu
                                id="signup-menu"
                                anchorEl={anchorElSignUp}
                                open={openSignUp}
                                onClose={handleSignUpClose}
                                MenuListProps={{
                                    'aria-labelledby': 'signup-button',
                                }}
                            >
                                <Link to="/student-signup"><MenuItem onClick={handleSignUpClose}><PersonIcon />Student</MenuItem></Link>
                                <Link to="/teacher-signup"><MenuItem onClick={handleSignUpClose}><ManageAccountsIcon />Teacher</MenuItem></Link>
                            </Menu>

                            <Button id="login" style={{ color: "white" }} variant="outlined" onClick={handleLoginClick}>Log in</Button>
                            <Menu
                                id="login-menu"
                                anchorEl={anchorElLogin}
                                open={openLogin}
                                onClose={handleLoginClose}
                                MenuListProps={{
                                    'aria-labelledby': 'login-button',
                                }}
                            >
                                <Link to="/student-login"><MenuItem onClick={handleLoginClose}><PersonIcon />Student</MenuItem></Link>
                                <Link to="/teacher-login"><MenuItem onClick={handleLoginClose}><ManageAccountsIcon />Teacher</MenuItem></Link>
                            </Menu>
                        </div>
                    )
                }
            </div>
        </div>
    );
};