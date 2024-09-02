const Blog = require("../models/Blog");

const getBlogs = (request, response) => {
  Blog.find({})
    .then((blogs) => {
      return response.status(200).json(blogs);
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
};

const getBlogById = (request, response) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      return response.status(200).json(blog);
    })
    .catch((error) => {
      return response.status(500).json(error);
    });
};

module.exports = {
  getBlogs,
  getBlogById,
};
