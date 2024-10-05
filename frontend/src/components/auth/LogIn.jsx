import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { CircularProgress, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import { Login } from '@mui/icons-material';
import { NavBar } from '../shared/NavBar';
import { useSelector } from 'react-redux';

export const LogIn = () => {
    const { loading } = useSelector(store => store.auth);

    const [formData, setFormData] = useState({
        collegeEmail: '',
        password: '',
        usn: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
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
                <form onSubmit={handleSubmit} className="max-w-2xl shadow-md p-4 mx-auto rounded-md bg-[white]">
                    <div className="w-[100%] p-4">
                        <div>
                            <h1 className="text-3xl mb-2 font-bold">Log in</h1>
                        </div>
                    </div>
                    <Divider />
                    <div className="w-[100%] p-4 flex flex-col gap-4 items-start justify-center">
                        <div className="flex flex-wrap justify-between w-[100%]">
                            <TextField
                                className='w-full'
                                id="outlined-collegeEmail"
                                label="College email"
                                variant="outlined"
                                name="collegeEmail"
                                value={formData.collegeEmail}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex justify-between w-[100%]">
                            <TextField

                                className="w-full"
                                id="outlined-usn"
                                label="USN"
                                variant="outlined"
                                name="usn"
                                value={formData.usn}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="flex justify-between w-[100%]">
                            <TextField
                                className='w-full'
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
                            loading ?
                                <Button
                                    style={{ backgroundColor: "#0B2F9F", lineHeight: "2.5rem" }}
                                    className="w-full shadow-none"
                                    variant="contained"
                                    endIcon={<CircularProgress />}
                                    type="submit"
                                >

                                </Button>
                                :
                                <Button
                                    style={{ backgroundColor: "#0B2F9F", lineHeight: "2.5rem" }}
                                    className="w-full shadow-none"
                                    variant="contained"
                                    endIcon={<Login />}
                                    type="submit"
                                >
                                    Log in
                                </Button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
}
