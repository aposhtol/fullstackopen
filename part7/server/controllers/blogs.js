const blogsRouter = require("express").Router();
//const { response } = require("express");
const Blog = require("../models/blog");
const User = require("../models/user");
const Comment = require("../models/comment");
const { userExtractor } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", { text: 1 });
  response.json(blogs);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { body, user } = request;

  const userEntry = await User.findById(user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: userEntry._id,
  });

  const savedBlog = await blog.save();
  userEntry.blogs = userEntry.blogs.concat(savedBlog._id);
  await userEntry.save();

  response.status(201).json(savedBlog);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end;
  }
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  //const user = jwt.verify(request.token, process.env.SECRET)

  if (blog.user.toString() === request.user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).send({
      error: "Unauthorized",
    });
  }
});

blogsRouter.put("/:id", userExtractor, async (request, response) => {
  const { likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { likes },
    { new: true }
  );
  response.json(updatedBlog);
});

blogsRouter.post("/:id/comments", async (request, response) => {
  const id = request.params.id;

  const blogEntry = await Blog.findById(id);

  const comment = new Comment({
    text: request.body.comment,
    blog: blogEntry._id,
  });

  const savedComment = await comment.save();
  blogEntry.comments = blogEntry.comments.concat(savedComment._id);
  await blogEntry.save();

  response.status(201).json(savedComment);
});

module.exports = blogsRouter;
