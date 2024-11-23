import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from '../shared/NavBar';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '@/redux/authSlice';
import { API_ENDPOINT } from '@/utils/const';
import axios from 'axios';
import { toast } from 'sonner';

export const AdminSignUp = () => {
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        personalEmail: '',
        phoneNumber: '',
        collegeEmail: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            dispatch(setLoading(true));            

            const res = await axios.post(`${API_ENDPOINT}/admin/signup`, formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });            

            if (res.data.success) {
                navigate("/admin-login");
                toast.success("Sign up successful!");
            } 
        } catch (error) {
            console.log(error.response?.data?.message);
            toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <NavBar />
            <div className="max-w-7xl p-4 m-4 mx-auto">
                <form onSubmit={handleSubmit} className="max-w-2xl shadow-lg p-4 mx-auto rounded-md bg-[white]">
                    <div className="w-[100%] p-4">
                        <div>
                            <h1 className="text-3xl mb-2 font-bold">Admin Sign up</h1>
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
                        {
                            loading ? (
                                <Button
                                    style={{ lineHeight: "2.5rem" }}
                                    className="w-full shadow-none bg-blue-800"
                                    variant="contained"
                                    endIcon={<CircularProgress />}
                                    type="submit"
                                />
                            ) : (
                                <Button
                                    style={{ lineHeight: "2.5rem" }}
                                    className="w-full shadow-none bg-blue-600 hover:bg-blue-800"
                                    variant="contained"
                                    endIcon={<ArrowUpwardIcon />}
                                    type="submit"
                                >
                                    Sign Up
                                </Button>
                            )
                        }

                        <div className="flex justify-center mt-4">
                            <Button
                                variant="text"
                                style={{ color: "black" }}
                                onClick={() => navigate('/admin-login')}
                            >
                                Already have an account? <span style={{ color: "blue" }}> &nbsp; Log in</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};
