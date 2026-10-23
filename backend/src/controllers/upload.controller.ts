import { Request, Response } from 'express';
import path from 'path';

export const uploadFile = (req: Request, res: Response): void => {
  if (!req.file) {
    res.status(400).json({ success: false, message: 'No file uploaded.' });
    return;
  }

  // Return the public URL path to the uploaded file
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
};
