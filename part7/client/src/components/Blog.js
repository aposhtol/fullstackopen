import { selectBlogs, deleteBlog, likeBlog } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Blog = () => {
  const blogs = useSelector(selectBlogs);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  const [newComment, setNewComment] = useState("");

  const handleComment = async (event) => {
    event.preventDefault();
    const comment = {
      comment: newComment,
    };
    const response = await blogService.comment(id, comment);

    comments.concat(response);

    setNewComment("");
  };

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id, blog.title));
    navigate("/blogs");
  };

  if (!blog) {
    return null;
  }
  const comments = blog.comments;

  return (
    <div>
      <div key={blog.id}>
        <h2>{blog.title}</h2>
        <br />
        <a href={blog.url}>{blog.url}</a>
        <br />
        likes {blog.likes}
        <button onClick={() => dispatch(likeBlog(blog.id))}>like</button>
        <br />
        {blog.author}
        <br />
        <h2>comments</h2>
        <form onSubmit={handleComment}>
          <input
            value={newComment}
            placeholder="...write comment here"
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <br />
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
        <br />
        <button onClick={handleDelete}>remove blog</button>
      </div>
    </div>
  );
};

export default Blog;
