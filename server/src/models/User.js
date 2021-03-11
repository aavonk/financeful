import mongoose from 'mongoose';

const { model, Schema } = mongoose;

const UserSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    firstName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: String,
  },
  { timestamps: true },
);

const User = model('User', UserSchema);

export default User;
