import { Router } from "express";
import postController from "../controllers/post-controller";

const router = Router();

// GET: Mengambil seluruh tasks
router.get("/", postController.getPost);

// GET: Mengambil task berdasarkan ID
router.get("/:id", postController.getPostById);

// POST: Menambahkan task baru
router.post("/", postController.createPosts);

// PUT: Memperbarui task berdasarkan ID
router.put("/:id", postController.updatePosts);

// DELETE: Menghapus task berdasarkan ID
router.delete("/:id", postController.deletePosts);

export default router;
