//to make api calls
import axios from 'axios';

const url = 'http://localhost:5000/posts'; //URL pointing to our backed route


//get(url) -> to which url it will make a request
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost); //url, data
export const updatePost = (id,updatedPost) => axios.patch(`${url}/${id}`, updatedPost); //url, id -> which post to update
