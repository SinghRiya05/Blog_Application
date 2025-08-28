import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],  
    default: 'user',          
  },
  image: {
    type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"    
  },
 
},{timestamps:true});




userSchema.pre("save", async function(next){
 if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

userSchema.methods.isPasswordCorrect = async function (plainPassword) {
    return bcrypt.compare(plainPassword, this.password);
};

export const User = mongoose.model('User', userSchema);
