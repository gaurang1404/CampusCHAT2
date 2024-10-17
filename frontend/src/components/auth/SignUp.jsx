import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import {useSelector} from "react-redux";
import { departments } from '../../data/departments';
import { NavBar } from '../shared/NavBar';
import {CircularProgress} from '@mui/material';


export const SignUp = () => {
    // const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        personalEmail: '',
        phoneNumber: '',
        admissionType: '',
        collegeEmail: '',
        password: '',
        usn: '',
        section: '',
        department: '',
        semester: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAutocompleteChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div>
            <NavBar />
            <div className="max-w-7xl p-4 m-4 mx-auto">
                <form onSubmit={handleSubmit} className="max-w-2xl shadow-lg p-4 mx-auto rounded-md bg-[white]">
                    <div className="w-[100%] p-4">
                        <div>
                            <h1 className="text-3xl mb-2 font-bold">Sign Up</h1>
                        </div>
                    </div>
                    <Divider />
                    <div className="w-[100%] p-4 flex flex-col gap-4 items-start justify-center">
                        <div>
                            <h2 className="text-1xl mb-2">Personal Details</h2>
                        </div>
                        <div className="flex flex-wrap justify-between w-[100%]">
                            <TextField
                                className="basis-[49%]"
                                id="outlined-firstName"
                                label="First name"
                                variant="outlined"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                className="basis-[49%]"
                                id="outlined-lastName"
                                label="Last name"
                                variant="outlined"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex justify-between w-[100%]">
                            <TextField
                                className="w-full"
                                id="outlined-personalEmail"
                                label="Personal email"
                                variant="outlined"
                                name="personalEmail"
                                value={formData.personalEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex flex-wrap justify-between w-[100%]">
                            <TextField
                                className="basis-[49%]"
                                id="outlined-phoneNumber"
                                label="Phone number"
                                variant="outlined"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                            <div className="basis-[49%]">
                                <Autocomplete
                                    disablePortal
                                    options={["K-CET", "COMEDK", "Management"]}
                                    value={formData.admissionType}
                                    onChange={(event, newValue) =>
                                        handleAutocompleteChange('admissionType', newValue)
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} label="Admission type" required />
                                    )}
                                />
                            </div>
                        </div>
                        <h2 className="text-1xl mb-2">College Details</h2>
                        <div className="flex flex-wrap justify-between w-[100%]">
                            <TextField
                                className="basis-[49%]"
                                id="outlined-collegeEmail"
                                label="College email"
                                variant="outlined"
                                name="collegeEmail"
                                value={formData.collegeEmail}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                className="basis-[49%]"
                                id="outlined-password"
                                label="Password"
                                variant="outlined"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="w-full">
                            <Autocomplete
                                disablePortal
                                options={departments}
                                value={formData.department}
                                onChange={(event, newValue) =>
                                    handleAutocompleteChange('department', newValue)
                                }
                                renderInput={(params) => <TextField {...params} label="Department" />}
                            />
                        </div>
                        <div className="flex justify-between w-[100%]">
                            <TextField
                                className="w-[49%]"
                                id="outlined-usn"
                                label="USN"
                                variant="outlined"
                                name="usn"
                                value={formData.usn}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                className="w-[49%]"
                                id="outlined-section"
                                label="Section"
                                variant="outlined"
                                name="section"
                                value={formData.section}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='w-full'>
                        <TextField
                                className="w-[49%]"
                                id="outlined-semester"
                                label="Semester"
                                variant="outlined"
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {
                            loading ?
                                <Button
                                    style={{ lineHeight: "2.5rem" }}
                                    className="w-full shadow-none bg-blue-800"
                                    variant="contained"                                    
                                    endIcon={<CircularProgress />}
                                    type="submit"
                                >
                                    
                                </Button>
                            :
                                <Button
                                    style={{ lineHeight: "2.5rem" }}
                                    className="w-full shadow-none bg-blue-600 hover:bg-blue-800"
                                    variant="contained"
                                    endIcon={<ArrowUpwardIcon />}
                                    type="submit"
                                >
                                    Sign Up
                                </Button>
                        }

                    </div>
                </form>
            </div>
        </div>
    );
};
