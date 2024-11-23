import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Autocomplete, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useDispatch, useSelector } from "react-redux";
import { NavBar } from '../shared/NavBar';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '@/redux/authSlice';
import { API_ENDPOINT } from '@/utils/const';
import { setUser, setCollege } from '@/redux/authSlice';
import axios from 'axios';
import { toast } from 'sonner';

export const AddCollege = () => {

  const { loading, user } = useSelector(store => store.auth);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    state: '',
    taluka: '',
    street: '',
    landmark: '',
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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(setLoading(true));
  
      const college = {
        name: formData.name,
        location: {
          state: formData.state,
          street: formData.street,
          taluka: formData.taluka,
          landmark: formData.landmark
        }
      };
  
      // Sending the college object via axios POST request
      const res = await axios.post(`${API_ENDPOINT}/college/add`, college, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,  // Include cookies in the request if needed
      });
  
      // Handling the response  
      res.data.admin.role="Admin";    
      dispatch(setUser(res.data.admin));
      dispatch(setCollege(res.data.college));
  
      if (res.data.success) {
        navigate("/");
        toast.success("College added successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };
  
  

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal"
  ];

  const isLocationDisabled = !formData.state; 

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl p-4 m-4 mx-auto">
        <form onSubmit={handleSubmit} className="max-w-2xl shadow-lg p-4 mx-auto rounded-md bg-[white]">
          <div className="w-[100%] p-4">
            <div>
              <h1 className="text-3xl mb-2 font-bold">Add College Information</h1>
            </div>
          </div>
          <Divider />
          <div className="w-[100%] p-4 flex flex-col gap-4 items-start justify-center">
            <h2 className="text-1xl mb-2">College Details</h2>
            <div className="flex flex-wrap justify-between w-[100%]">
              <TextField
                className="basis-[100%]"
                id="outlined-name"
                label="College name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <h2 className="text-1xl mb-2">Location</h2>
            <div className="w-full">
              <Autocomplete
                disablePortal
                options={states}
                value={formData.state}
                onChange={(event, newValue) =>
                  handleAutocompleteChange('state', newValue)
                }
                renderInput={(params) => <TextField {...params} label="State" />}
              />
            </div>

            <div className="flex flex-wrap justify-between w-[100%] gap-4">
              <TextField
                className="basis-[48%]"
                id="outlined-taluka"
                label="Taluka"
                variant="outlined"
                name="taluka"
                value={formData.taluka}
                onChange={handleChange}
                required
                disabled={isLocationDisabled}
              />
              <TextField
                className="basis-[48%]"
                id="outlined-street"
                label="Street"
                variant="outlined"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                disabled={isLocationDisabled}
              />
              <TextField
                className="basis-[48%]"
                id="outlined-landmark"
                label="Landmark"
                variant="outlined"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                required
                disabled={isLocationDisabled}
              />
            </div>

            {loading ? (
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
                Add College
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
