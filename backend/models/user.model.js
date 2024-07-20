import mongoose from 'mongoose';

const userSchema = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
  },
  searchHistory: {
    type: Array,
    default: [],
  },
};

export const User = mongoose.model('User', userSchema);
