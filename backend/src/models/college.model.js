import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId, 
        ref: 'Admin',
        required: true
    },

    name: {
        type: String,
        required: true
    },

    state: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    principal: {
        type: String,
        required: true
    },

    vicePrincipal: {
        type: String,
        required: true
    },

    departments: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'Department'
        }
    ]
}, {timestamps: true});

export const College = mongoose.model('College', CollegeSchema);

