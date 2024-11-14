const { createStore } = require('redux');
const users = require('./usersData'); 
const posts = require('./postsData');

const SET_USERS = 'SET_USERS';
const SET_POSTS = 'SET_POSTS';

const setUsers = (users) => ({ type: SET_USERS, payload: users });
const setPosts = (posts) => ({ type: SET_POSTS, payload: posts });

const initialState = {
    users: [],
    posts: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
      case SET_USERS:
          return { ...state, users: action.payload };
      case SET_POSTS:
          return { ...state, posts: action.payload };
      default:
          return state;
  }
};

const store = createStore(reducer);
store.dispatch(setUsers(users));
store.dispatch(setPosts(posts));

const getPostsByUserId = (userId) => {
  const state = store.getState();
  const user = state.users.find(user => user.id === userId); 
  if (!user) {
      console.log(`Пользователь с ID ${userId} не найден.`);
      return;
  }

  const userPosts = state.posts.filter(post => post.userId === userId);

  console.log(`Посты пользователя: ${user.name}`);
  userPosts.forEach(post => {
      console.log(`Title: ${post.title}`);
      console.log(`Body: ${post.body}`);
      console.log('---');
  });
};

// Вставить в скорбки любой айдишник от 1 до 10 включительно
getPostsByUserId();