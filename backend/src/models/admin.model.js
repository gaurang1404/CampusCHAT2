import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    personalEmail: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    collegeEmail: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    collegeId: {
        type: Schema.Types.ObjectId,
        ref: "College"
    }
    
}, {timestamps: true});

export const Admin = mongoose.model('Admin', AdminSchema);

