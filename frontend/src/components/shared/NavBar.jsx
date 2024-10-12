import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { MenuItem } from '@mui/material';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


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
        <div className='bg-blue-800'>
            <div className='max-w-7xl p-2 mx-auto flex justify-between'>
                <Link to="/">
                    <div className='flex justify-start items-center'>
                        <span className='w-11 h-11'>
                            <img className='w-full h-full' src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/BMS_College_of_Engineering.svg/800px-BMS_College_of_Engineering.svg.png" alt="" />
                        </span>
                        <h1 className='text-4xl font-extrabold rounded-md p-2 pb-4 text-[white]'>BMS<span className='text-[white]'>CE</span></h1>
                    </div>
                </Link>

                <div className='flex justify-between items-center pb-1 text-[white] '>
                    <Link to="/"><Button className='text- font-bold' variant="link"><HomeIcon style={{fontSize: "1.2rem"}} className='mr-1'/>Home</Button></Link>
                    {
                        user ? 
                            <Link to="/student-dashboard" ><Button className='text- font-bold' variant="link"><DashboardIcon style={{fontSize: "1rem"}} className='text-xs mr-1'/>Dashboard</Button></Link>                            
                        : null
                    }
                    {
                        user ? 
                        <Link><Button className='text- font-bold' variant="link"><CurrencyRupeeIcon style={{fontSize: "1rem"}} className='text-xs mr-1' />Fees</Button></Link>
                        : null
                    }
                    <Link><Button className='text- font-bold' variant="link"><SchoolIcon style={{fontSize: "1rem"}} className='text-xs mr-[0.3rem]'/> Results</Button></Link>
                    <Link><Button className='text- font-bold' variant="link"><ArrowOutwardIcon style={{fontSize: "1rem"}} className='text-xs mr-1'/>Official website</Button></Link>
                </div>

                {
                    user ? (
                        <div>
                            <Popover >
                                <PopoverTrigger>
                                    <div id="profile" className='flex items-center mt-3'>
                                        <Avatar
                                            src="/broken-image.jpg"
                                            onClick={handleProfileClick}
                                            style={{ cursor: 'pointer', border: '2px solid white' }}
                                        />
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent className="bg-white shadow-lg p-4 w-full">
                                    <div className='flex flex-col'>
                                        <div className='flex justify-start gap-4 w-full'>
                                            <Avatar
                                                src="/broken-image.jpg"
                                                onClick={handleProfileClick}
                                                style={{ cursor: 'pointer', border: '2px solid white' }}
                                            />
                                            <div className='flex flex-col justify-center items-start'>
                                                <h1 className='font-bold text-md'>Gaurang Shirodkar</h1>
                                                <p>Information Science and Engineering</p>
                                            </div>
                                        </div>

                                        <div className='mt-2'>
                                            <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                                                <MenuItem onClick={handleProfileClose}>
                                                    <PersonIcon style={{ marginRight: '8px' }} />
                                                    My Profile
                                                </MenuItem>
                                            </Link>
                                            <Link>
                                                <AlertDialog>
                                                    <AlertDialogTrigger className="w-full">
                                                        <MenuItem>
                                                            <LogoutIcon style={{ marginRight: "8px", color: "red" }} />
                                                            <span className="text-[red]">Logout</span>
                                                        </MenuItem>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent className="bg-white shadow-lg p-4 w-full">
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                You will be logged out and redirected to the home page.
                                                                <br />
                                                                Do you want to continue?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                                                            <AlertDialogAction onClick={handleLogoutConfirm} className="bg-blue-800 text-white hover:bg-blue-900 rounded-xl">
                                                                Log out
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                            </Link>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    ) : (
                        <div className='flex items-center gap-2'>
                            <Popover>
                                <PopoverTrigger>
                                    <Button className="text-[white] hover:text-white hover:bg-blue-600" id="signup" variant="outline">Sign Up</Button>
                                </PopoverTrigger>
                                <PopoverContent className="bg-white shadow-lg rounded-lg p-4">
                                    <div className='flex flex-col'>
                                        <Link to="/student-signup">
                                            <MenuItem onClick={handleSignUpClose}>
                                                <PersonIcon />Student
                                            </MenuItem>
                                        </Link>
                                        <Link to="/teacher-signup">
                                            <MenuItem onClick={handleSignUpClose}>
                                                <ManageAccountsIcon />Teacher
                                            </MenuItem>
                                        </Link>
                                    </div>
                                </PopoverContent>
                            </Popover>

                            <Popover>
                                <PopoverTrigger>
                                    <Button style={{ color: "white" }} id="login" onClick={handleLoginClick}>Log In</Button>
                                </PopoverTrigger>
                                <PopoverContent className="bg-white shadow-lg rounded-lg p-4">
                                    <div className='flex flex-col'>
                                        <Link to="/student-login">
                                            <MenuItem onClick={handleLoginClose}>
                                                <PersonIcon />Student
                                            </MenuItem>
                                        </Link>
                                        <Link to="/teacher-login">
                                            <MenuItem onClick={handleLoginClose}>
                                                <ManageAccountsIcon />Teacher
                                            </MenuItem>
                                        </Link>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    )
                }
            </div>
        </div>
    );
};
