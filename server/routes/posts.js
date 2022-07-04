import express from "express";

import { getPosts, cretePost, updatePost } from "../controllers/posts.js";

const router = express.Router();

//http://localhost:5000/posts

router.get("/", getPosts);
router.post("/", cretePost);
router.patch('/:id', updatePost); //patch is used for updating existing document
///:id will be a dynamic id because for updation we need it. for creation we are always crating a new id

export default router;
