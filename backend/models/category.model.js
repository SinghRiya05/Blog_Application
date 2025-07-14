import mongoose from "mongoose";
import slugify from "slugify"
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description:{
        type:String,
        default:""
    }
  },
  { timestamps:true }
);

categorySchema.pre("save",function(next){
    if(this.name){
        this.slug=slugify(this.name,{lower:true})
    }
    next();
})

export const Category=mongoose.model("Category",categorySchema)