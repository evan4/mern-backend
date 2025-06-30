import express from 'express';

import { protect } from "../middleware/authMiddleware.js";
import {
  createResume, deleteResume, getResumeById, getUsersResumes,
  updateResume
} from "../controllers/ResumeController.js";
import { uploadResumeImages } from "../controllers/uploadImages.js";

const resumeRoutes = express.Router();

resumeRoutes.get('/', protect, getUsersResumes);
resumeRoutes.get('/:id', protect, getResumeById);

resumeRoutes.post('/:id', protect, createResume);
resumeRoutes.put('/:id', protect, updateResume);
resumeRoutes.put('/:id/upload-images', protect, uploadResumeImages);

resumeRoutes.delete('/:id', protect, deleteResume);


export default resumeRoutes;
