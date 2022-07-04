import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

const Form = ({currentId, setCurrentId}) => {
  const [postData, setPostData] = useState({
    //postData ->initial state
    //object that we want to set the postData at the start
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null)); //single post returned
  const classes = useStyles();
  const dispatch = useDispatch(); //allows us to dispatch actions

  useEffect(()=>{ //used to populate the values of the form
    if(post) setPostData(post);
  },[post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(currentId){
      dispatch(updatePost(currentId, postData));
    }
    else{
      dispatch(createPost(postData)); 
      //dispatching createPost of actions and passing all the data from our state postData
    }
    clear();
  };
  
  const clear = ()=>{
    setCurrentId(null);
    setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  return (
    //paper is like a div which has whitish background
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator} //value stored in the state
          onChange={(e) => setPostData({ ...postData, creator: e.target.value })} //want to update one of the object in postData using this, e is the event
          //spreading the postData, all the data will persist changing only property of that specific text field
          //otherwiese other text fields could have overiden it.we want seperate data in each text field
        />

        <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
        <div className={classes.fileInput}>
            <FileBase
                type = "file"
                multiple ={false}  //need only one
                onDone = {({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                //by ...postData -> we are spreading the postData and then we set selectedfile
            />
        </div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button> 
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button> 
        {/* With Material UI we just passed props to button  */}

      </form>
    </Paper>
  )
}
export default Form;
