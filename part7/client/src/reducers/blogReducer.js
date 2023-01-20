import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const blogReducer = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const id = action.payload.id;

      return state.map((blog) => (blog.id !== id ? blog : action.payload));
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const anecdotes = await blogService.create(blog);
      dispatch(appendBlog(anecdotes));
      dispatch(
        setNotification(
          `A new blog ${blog.title} by ${blog.author} added`,
          5000
        )
      );
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();

      const [blog] = state.blogs.filter((blog) => blog.id === id);
      const updatedBlog = { ...blog, likes: blog.likes + 1 };
      const response = await blogService.update(id, updatedBlog);
      dispatch(like(response));
      dispatch(setNotification(`You liked ${updatedBlog.title}!`, 5000));
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const deleteBlog = (id, name) => {
  return async (dispatch) => {
    try {
      if (window.confirm(`Delete ${name}?`)) {
        await blogService.remove(id);
        const blogs = await blogService.getAll();
        dispatch(setBlogs(blogs));
      }
    } catch (err) {
      dispatch(setNotification(err.response.data.error, 5000));
    }
  };
};

export const selectBlogs = (state) => [...state.blogs];
export const { setBlogs, appendBlog, like } = blogReducer.actions;
export default blogReducer.reducer;
