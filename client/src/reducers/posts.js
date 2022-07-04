
export default (posts = [],action) =>{ 
    //states always have to be something, our posts are going to be an array
    switch(action.type){
        //will return logic from here
        case 'FETCH_ALL':
            return action.payload; //contains the posts
        case 'CREATE':
            return [...posts, action.payload]; //new post stored in action.payload
        case 'UPDATE':
            return posts.map((post) => post._id === action.payload._id ? action.payload : post); //updated post stored in action.payload
            //post will iterate over the posts array and when id matches it will update it.
        default:
            return posts;
    }
}