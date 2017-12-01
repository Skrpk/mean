import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  login: { type: String, unique: true, lowercase: true, index: true },
  email: String,
  password: String,
  confirmed: { type: Boolean, default: false },
});

UserSchema.methods.comparePasswords = function comparePasswords(password) {
  return bcrypt.compare(password, this.password);
};

export default UserSchema;
