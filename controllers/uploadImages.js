import fs from 'fs';
import path from 'path';

import Resume from '../models/resumeModel.js';
import upload from "../middleware/uploadMiddleware.js";

export const uploadResumeImages = async (req, res) => {
  try {
    // configure multer to handle images
    upload.fields([
      {
        name: "thumbnail",
      },
      {
        name: "profileImage",
      },
    ])
      (req, res, async (err) => {

        if (err) {
          return res.status(400).json({
            message: "File upload failed",
            error: err.message,
          })
        }

        const resumeId = req.params.id;
        const resume = await Resume.findOne({
          _id: req.params.id,
          userId: req.user._id,
        });

        if (!resume) {
          return res.status(404).json({ message: 'Resume not found' });
        }

        // use process cmd to locate uploads folder
        const uploadsFolder = path.join(process.cwd(), 'uploads');
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const newThumbnail = req.files.thumbnail?.[0];
        const newProfileImage = req.files.profileImage?.[0];

        if (newThumbnail) {
          if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));

            if (fs.existsSync) {
              fs.unlink(oldThumbnail);
            }
          }

          resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }

        if (newProfileImage) {
          if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));

            if (fs.existsSync) {
              fs.unlink(oldProfile);
            }
          }

          resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
        }

        await resume.save();
        res.json({
          message: 'Image upload successully',
          thumbnailLink: resume.thumbnailLink,
          profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
        });
      })
  } catch (error) {
    res.status(500).json({
      message: "Failed to upload images",
      error: error.message,
    })
  }
}
