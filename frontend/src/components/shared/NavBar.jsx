import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, MenuItem } from '@mui/material';
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
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { HamIcon, InboxIcon, MailIcon, MenuIcon } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { API_ENDPOINT } from '@/utils/const';
import { logout } from '@/redux/authSlice';

export const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [drawer, setDrawer] = useState({ right: false });    
    const { user, college } = useSelector(store => store.auth);
    
    const [anchorElSignUp, setAnchorElSignUp] = useState(null);
    const [anchorElLogin, setAnchorElLogin] = useState(null);
    const [anchorElProfile, setAnchorElProfile] = useState(null);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

    const openSignUp = Boolean(anchorElSignUp);
    const openLogin = Boolean(anchorElLogin);
    const openProfile = Boolean(anchorElProfile);

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawer({ ...drawer, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {
                    user?.role != "Student" ?
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon style={{ fontSize: "1rem" }}>
                                    <DashboardIcon />
                                </ListItemIcon>
                                <Link to="/student-dashboard" >
                                    <ListItemText
                                        className='font-bold'
                                        variant="link">

                                        Dashboard
                                    </ListItemText>
                                </Link>
                            </ListItemButton>
                        </ListItem> : null
                }

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon style={{ fontSize: "1rem" }}>
                            <SchoolIcon />
                        </ListItemIcon>
                        <Link>
                            <ListItemText
                                className='font-bold'
                                variant="link">

                                Results
                            </ListItemText>
                        </Link>
                    </ListItemButton>
                </ListItem>

                {
                    user?.role != "Student" ?
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon style={{ fontSize: "1rem" }}>
                                    <CurrencyRupeeIcon />
                                </ListItemIcon>
                                <Link>
                                    <ListItemText
                                        className='font-bold'
                                        variant="link">

                                        Fees
                                    </ListItemText>
                                </Link>
                            </ListItemButton>
                        </ListItem>
                        : null
                }

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon style={{ fontSize: "1rem" }}>
                            <SchoolIcon />
                        </ListItemIcon>
                        <Link>
                            <ListItemText
                                className='font-bold'
                                variant="link">

                                Results
                            </ListItemText>
                        </Link>
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon style={{ fontSize: "1rem" }}>
                            <ArrowOutwardIcon />
                        </ListItemIcon>
                        <Link>
                            <ListItemText
                                className='font-bold'
                                variant="link">

                                Official website
                            </ListItemText>
                        </Link>
                    </ListItemButton>
                </ListItem>

                {
                    user ? null :
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon style={{ fontSize: "1rem" }}>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <Link to="/admin-signup">
                                    <ListItemText
                                        className='font-bold'
                                        variant="link">

                                        I am an Admin
                                    </ListItemText>
                                </Link>
                            </ListItemButton>
                        </ListItem>
                }

                {                    
                    (user?.role == "Admin" && user?.collegeId) ?
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon style={{ fontSize: "1rem" }}>
                                    <AdminPanelSettingsIcon />
                                </ListItemIcon>
                                <Link to="/admin-dashboard">
                                    <ListItemText
                                        className='font-bold'
                                        variant="link">

                                        College Details
                                    </ListItemText>
                                </Link>
                            </ListItemButton>
                        </ListItem> : 
                        
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon style={{ fontSize: "1rem" }}>
                                    <ArrowOutwardIcon />
                                </ListItemIcon>
                                <Link to="/add-college">
                                    <ListItemText
                                        className='font-bold'
                                        variant="link">

                                        Add College Details
                                    </ListItemText>
                                </Link>
                            </ListItemButton>
                        </ListItem>
                }



            </List>
        </Box>
    );

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

    const handleLogoutClick = async () => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/admin/logout`, {}, { withCredentials: true });
            console.log(response);
            
            if (response.data.success) {
                
                toast.success(response.data.message);
    
                // Dispatch Redux action to clear the auth state
                dispatch(logout());
                
                navigate("/");
                // Optionally reload the page to reset the state
                window.location.reload();

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Failed to log out. Please try again.");
        }
    };
    

    const handleLogoutConfirm = async () => {
        try {
            const response = await axios.post(`${API_ENDPOINT}/admin/logout`, {}, { withCredentials: true });
            console.log(response);
            
            if (response.data.success) {
                
                toast.success(response.data.message);
    
                // Dispatch Redux action to clear the auth state
                dispatch(logout());
                
                navigate("/");
                // Optionally reload the page to reset the state
                window.location.reload();

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Failed to log out. Please try again.");
        }

        console.log("User logged out");
        setOpenLogoutDialog(false);
    };

    const handleLogoutCancel = () => {
        setOpenLogoutDialog(false);
    };

    return (
        <div className='bg-blue-800 min-w-full container mx-auto'>
            <div className='min-w-full lg:max-w-7xl p-2 mx-auto flex justify-between'>
                <Link to="/">
                    <div className='flex justify-start items-center'>
                        <span className='w-8 h-8 md:w-8 md:h-8 lg:w-11 lg:h-11'>
                            <img className='w-full h-full' src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/BMS_College_of_Engineering.svg/800px-BMS_College_of_Engineering.svg.png" alt="" />
                        </span>
                        <h1 className='text-2xl md:text-3xl lg:text-4xl font-extrabold rounded-md p-2 pb-4 text-[white]'>BMS<span className='text-[white]'>CE</span></h1>
                    </div>
                </Link>

                <div className='hidden md:flex justify-between items-center pb-1 text-[white] '>
                    <Link to="/"><Button className='text- font-bold hidden lg:block' variant="link"><HomeIcon style={{ fontSize: "1.2rem" }} className='mr-1' />Home</Button></Link>                    
                    {
                        user?.role == "Student" ?
                            <Link to="/student-dashboard" ><Button className='text- font-bold' variant="link"><DashboardIcon style={{ fontSize: "1rem" }} className='text-xs mr-1' />Dashboard</Button></Link>
                            : null
                    }
                    {
                        user?.role == "Student" ?
                            <Link><Button className='text- font-bold' variant="link"><CurrencyRupeeIcon style={{ fontSize: "1rem" }} className='text-xs mr-1' />Fees</Button></Link>
                            : null
                    }
                    <Link><Button className='text- font-bold' variant="link"><SchoolIcon style={{ fontSize: "1rem" }} className='text-xs mr-[0.3rem]' /> Results</Button></Link>
                    <Link><Button className='text- font-bold' variant="link"><ArrowOutwardIcon style={{ fontSize: "1rem" }} className='text-xs mr-1' />Official website</Button></Link>
                    {
                        user ? null : <Link to={"/admin-signup"}><Button className='text- font-bold' variant="link"><AdminPanelSettingsIcon style={{ fontSize: "1rem" }} className='text-xs mr-1' />I am an Admin</Button></Link>
                    }
                    {
                        college ?
                            <Link to={"/admin-dashboard"}><Button className='text- font-bold' variant="link"><ArrowOutwardIcon style={{ fontSize: "1rem" }} className='text-xs mr-1' />College Details</Button></Link> :
                            user?.role == "Admin" ? <Link to={"add-college"}><Button className='text- font-bold' variant="link"><ArrowOutwardIcon style={{ fontSize: "1rem" }} className='text-xs mr-1' />Add College</Button></Link> : null
                    }
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
                                                <h1 className='font-bold text-md'>{user.firstName + " " + user.lastName}</h1>
                                                {
                                                    user.role == "Admin" ?
                                                        <p>{user.collegeId ? college.name : "Add College details"}</p> : null
                                                }
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
                                                            <AlertDialogAction style={{ backgroundColor: "#1e40af" }} className="text-white hover:bg-blue-900 rounded-xl" onClick={handleLogoutConfirm} >                                                                
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

                <div className='md:hidden flex justify-center items-center'>
                    <Button onClick={toggleDrawer("right", true)}>
                        <MenuIcon className='text-white' />
                    </Button>
                    <Drawer
                        anchor={"right"}
                        open={drawer["right"]}
                        onClose={toggleDrawer("right", false)}
                    >
                        {list("right")}
                    </Drawer>
                </div>
            </div>
        </div>
    );
};
