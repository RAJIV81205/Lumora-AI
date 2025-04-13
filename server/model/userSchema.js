import mongoose from 'mongoose';

const formatIndianDate = () => {
    const now = new Date();
    return now.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
};

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    material: [{
        subName: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        summary: {
            type: String,
            required: true
        },
        study_guide: {
            type: String,
            required: true
        },
        addedAt: {
            type: String,  // Changed from Date to String
            default: formatIndianDate
        }
    }],
    createdAt: {
        type: String,  // Changed from Date to String
        default: formatIndianDate
    }
});

const User = mongoose.model('User', userSchema);

export default User;
