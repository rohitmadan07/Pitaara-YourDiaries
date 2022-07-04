import * as api from "../api";

//From Here We will make calls to the backend, We get necesaary infor from the client side and make an api call to the backend. fetchPosts and createPost would be written in the backend

//Functions that return actions -> Action Creators

export const getPosts = () => async (dispatch) => {
  //redux thunk allows to put an additional arrow function to use async await capabilities
  try {
    const { data } = await api.fetchPosts(); //data -> posts
    //return action; instead of returning action we have to dispatch it
    const action = { type: 'FETCH_ALL', payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post); //making a post api request to our backend

    //dispatch an action
    dispatch({ type: 'CREATE', payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    //dispatch an action
    dispatch({ type: 'UPDATE', payload: data }); //payload here is the updatedpost
  } catch (error) {
    console.log(error);
  }
}
