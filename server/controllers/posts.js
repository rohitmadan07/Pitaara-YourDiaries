//all handlers for routes -> logic for routes -> done so that the routes file doesnt get too complex
//all the callback functions required in get request are put here
import express from 'express'
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js"; //database

//Logic To Get Posts
export const getPosts = async(req, res) =>{
    try {
        const postMessages = await PostMessage.find();
        // console.log(postMessages);

        res.status(200).json(postMessages); // array of all messages
    } catch (error) {
        res.status(404).json({message: error.message});
    }
  }


//Logic To Create Post
export const cretePost = async(req,res)=>{
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new PostMessage({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();
        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({message : error.message});
    }
}

//Logic To Update Post
export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post,_id}, { new: true });

    res.json(updatedPost);
}
