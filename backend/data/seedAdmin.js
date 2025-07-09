// seedAdmin.js
import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';

await mongoose.connect(`mongodb+srv://riya:riya2006@cluster0.yualphp.mongodb.net/blogs`);

const existingAdmin = await User.findOne({ email: 'riyasingh979353@gmail.com' });

if (!existingAdmin) {
  const hashedPassword = await bcrypt.hash('riya2006', 10);

  await User.create({
    username: 'riyasingh',
    email: 'riyasingh979353@gmail.com',
    password: hashedPassword,
    role: 'admin'
  });

  console.log('✅ Admin created');
} else {
  console.log('⚠️ Admin already exists');
}

process.exit();
