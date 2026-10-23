import { Request, Response } from 'express';
import pool from '../config/database';

// POST /api/contact  — public, user submits contact form
export const submitContactMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      res.status(400).json({ success: false, message: 'All fields are required.' });
      return;
    }

    await pool.execute(
      `INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)`,
      [name.trim(), email.trim(), subject.trim(), message.trim()]
    );

    res.status(201).json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('SubmitContactMessage error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message.' });
  }
};

// GET /api/contact/admin/all  — admin, list all messages newest first
export const getAllMessages = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM contact_messages ORDER BY created_at DESC'
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetAllMessages error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch messages.' });
  }
};

// PUT /api/contact/admin/:id/read  — admin, mark a message as read
export const markAsRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.execute(
      'UPDATE contact_messages SET is_read = 1, updated_at = NOW() WHERE id = ?',
      [req.params.id]
    );
    const r = result as any;
    if (r.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Message not found.' });
      return;
    }
    res.json({ success: true, message: 'Message marked as read.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update message.' });
  }
};

// DELETE /api/contact/admin/:id  — admin, delete a message
export const deleteMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM contact_messages WHERE id = ?',
      [req.params.id]
    );
    const r = result as any;
    if (r.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Message not found.' });
      return;
    }
    res.json({ success: true, message: 'Message deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete message.' });
  }
};
