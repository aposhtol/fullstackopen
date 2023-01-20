import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => setNewTitle(event.target.value);
  const handleAuthorChange = (event) => setNewAuthor(event.target.value);
  const handleUrlChange = (event) => setNewUrl(event.target.value);

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const blog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    dispatch(createBlog(blog));

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            value={newTitle}
            placeholder="...write title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:{" "}
          <input
            value={newAuthor}
            placeholder="...write author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:{" "}
          <input
            value={newUrl}
            placeholder="...write URL"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
