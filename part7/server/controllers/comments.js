const commentsRouter = require("express").Router();
const Blog = require("../models/blog");
const Comment = require("../models/comment");

commentsRouter.post("/", async (request, response) => {
  const { comments } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { comments },
    { new: true }
  );
  response.json(updatedBlog);
});

blogsRouter.get("/:id/comments", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog.comments);
  } else {
    response.status(404).end;
  }
});
