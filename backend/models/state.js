import mongoose from "mongoose";

const stateSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    image:{
        type:String
    }

});

export const State = mongoose.model(
    "State",
    stateSchema
);