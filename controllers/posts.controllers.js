import { createPost, getPost } from "../models/posts.models.js";

export const posts = async (req, res) => {
  const { userId } = req.data;
  const { content } = req.body;
  try {
    if (!content) throw new Error("Content is required");

    const newPost = await createPost({ userId, content });

    res.status(201).send({
      message: "Created success",
      post: newPost,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const updatePost = async (req, res) => {
  const { userId } = req.data;
  const { content } = req.body;
  const { id } = req.params 
  try {
    const findPost = await getPost({_id: id, userId})
    if (!findPost) throw new Error("Post not found");
    findPost.content = content
    findPost.save();
    res.status(200).send({
        message: 'Updated!',
        data: findPost,
    })   
  } catch (error) {
    res.status(500).send({
        message: error.message,
      });
  }
};
