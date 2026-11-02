import { Request, Response } from "express";
import { Post } from "../types/post";

const dataPost: Post[] = [
  {
    id: 1,
    title: "Belajar Express.js",
    description: "Mempelajari routing dan controller",
    status: "pending",
  },
  {
    id: 2,
    title: "Membuat Task API",
    description: "Menyelesaikan challenge CRUD",
    status: "completed",
  },
  {
    id: 3,
    title: "Belajar TypeScript",
    description: "Memahami interface dan type",
    status: "pending",
  },
];

export class PostController {
  // GET: Mengambil seluruh tasks
  getPost = async (req: Request, res: Response) => {
    return res.status(200).json({
      status: true,
      message: "Get Data Tasks Success",
      data: {
        tasks: dataPost,
      },
    });
  };

  // GET: Mengambil task berdasarkan ID
  getPostById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const post = dataPost.find((post) => post.id === id);

    if (!Number.isInteger(id) || !post) {
      return res.status(404).json({
        status: false,
        message: "Task tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Get Task Success",
      data: {
        task: post,
      },
    });
  };

  // POST: Menambahkan task baru
  createPosts = async (req: Request, res: Response) => {
    const { title, description, status } = req.body;

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      !["pending", "completed"].includes(status)
    ) {
      return res.status(400).json({
        status: false,
        message:
          "Title, description, dan status wajib diisi. Status harus pending atau completed",
      });
    }

    const newId =
      dataPost.length > 0
        ? Math.max(...dataPost.map((post) => post.id)) + 1
        : 1;

    const newPost: Post = {
      id: newId,
      title: title.trim(),
      description: description.trim(),
      status,
    };

    dataPost.push(newPost);

    return res.status(201).json({
      status: true,
      message: "Create Task Success",
      data: {
        task: newPost,
      },
    });
  };

  // PUT: Memperbarui task berdasarkan ID
  updatePosts = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, description, status } = req.body;

    const post = dataPost.find((post) => post.id === id);

    if (!Number.isInteger(id) || !post) {
      return res.status(404).json({
        status: false,
        message: "Task tidak ditemukan",
      });
    }

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      !["pending", "completed"].includes(status)
    ) {
      return res.status(400).json({
        status: false,
        message:
          "Title, description, dan status wajib diisi. Status harus pending atau completed",
      });
    }

    post.title = title.trim();
    post.description = description.trim();
    post.status = status;

    return res.status(200).json({
      status: true,
      message: "Update Task Success",
      data: {
        task: post,
      },
    });
  };

  // DELETE: Menghapus task berdasarkan ID
  deletePosts = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const index = dataPost.findIndex((post) => post.id === id);

    if (!Number.isInteger(id) || index === -1) {
      return res.status(404).json({
        status: false,
        message: "Task tidak ditemukan",
      });
    }

    const deletedPost = dataPost.splice(index, 1)[0];

    return res.status(200).json({
      status: true,
      message: "Delete Task Success",
      data: {
        task: deletedPost,
      },
    });
  };
}

export default new PostController();
