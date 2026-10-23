import { Request, Response } from 'express';
import pool from '../config/database';

// POST /api/registrations  — public
export const submitRegistration = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      type, full_name, email, phone, age, gender,
      sport_name, experience,
      event_name,
      position, education, cv_link,
      message,
    } = req.body;

    if (!type || !full_name || !email || !phone) {
      res.status(400).json({ success: false, message: 'Type, full name, email and phone are required.' });
      return;
    }

    if (!['sport', 'event', 'vacancy'].includes(type)) {
      res.status(400).json({ success: false, message: 'Invalid registration type.' });
      return;
    }

    await pool.execute(
      `INSERT INTO registration_submissions
        (type, full_name, email, phone, age, gender,
         sport_name, experience, event_name, position, education, cv_link, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        type, full_name, email, phone,
        age || null, gender || null,
        sport_name || null, experience || null,
        event_name || null,
        position || null, education || null, cv_link || null,
        message || null,
      ]
    );

    res.status(201).json({ success: true, message: 'Registration submitted successfully.' });
  } catch (error) {
    console.error('SubmitRegistration error:', error);
    res.status(500).json({ success: false, message: 'Failed to submit registration.' });
  }
};

// GET /api/registrations/admin/all  — admin
export const getAllRegistrations = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM registration_submissions';
    const params: any[] = [];
    if (type) {
      query += ' WHERE type = ?';
      params.push(type);
    }
    query += ' ORDER BY created_at DESC';
    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch registrations.' });
  }
};

// PUT /api/registrations/admin/:id/status  — admin, update status
export const updateRegistrationStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    if (!['pending', 'reviewed', 'accepted', 'rejected'].includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status.' });
      return;
    }
    const [result] = await pool.execute(
      'UPDATE registration_submissions SET status = ?, updated_at = NOW() WHERE id = ?',
      [status, req.params.id]
    );
    const r = result as any;
    if (r.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Registration not found.' });
      return;
    }
    res.json({ success: true, message: 'Status updated.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
};

// DELETE /api/registrations/admin/:id  — admin
export const deleteRegistration = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM registration_submissions WHERE id = ?',
      [req.params.id]
    );
    const r = result as any;
    if (r.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Registration not found.' });
      return;
    }
    res.json({ success: true, message: 'Registration deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete registration.' });
  }
};
