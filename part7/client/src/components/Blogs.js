import BlogForm from "./BlogForm";
import Togglable from "./Togglable";
import { useSelector } from "react-redux";
import { selectBlogs } from "../reducers/blogReducer";
import { Link } from "react-router-dom";
import { List, Text } from "@mantine/core";

const Blogs = () => {
  const blogs = useSelector(selectBlogs);

  /*const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };*/

  return (
    <div>
      <Togglable buttonLabel="new blog">
        <BlogForm />
      </Togglable>

      {blogs
        .sort((a, b) => (a.likes > b.likes ? -1 : 0))
        .map((blog) => (
          <List withPadding key={blog.id}>
            <List.Item
            //id="default"
            //className="blog"
            >
              <Text color="grape.4" component={Link} to={`/blogs/${blog.id}`}>
                {blog.title} -- {blog.author}
              </Text>
            </List.Item>
          </List>
        ))}
    </div>
  );
};

export default Blogs;
