import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    subTitle:{
         type:String,
        required:true,
    },
    description:{
         type:String,
        required:true,
    },
    category:{
         type:String,
        required:true,
    },
    image:{
        type:String,
        
    },
    isPublished:{
        type:Boolean,
        required:true,

    },
    
    author:{
      type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    }
},{timestamps:true})

 export const Blog =mongoose.model("Blog",blogSchema)