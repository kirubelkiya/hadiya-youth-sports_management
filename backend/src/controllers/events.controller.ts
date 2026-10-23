import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit } = req.query;
    let query = "SELECT * FROM events WHERE status = 'active' ORDER BY date ASC";
    const params: any[] = [];

    if (limit) {
      query = `SELECT * FROM events WHERE status = 'active' ORDER BY date ASC LIMIT ?`;
      params.push(parseInt(limit as string));
    }

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch events.' });
  }
};

export const getAllEventsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM events ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch events.' });
  }
};

export const getEventById = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM events WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    if (items.length === 0) {
      res.status(404).json({ success: false, message: 'Event not found.' });
      return;
    }
    res.json({ success: true, data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch event.' });
  }
};

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, date, location, image, status } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO events (title, description, date, location, image, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, date, location, image || null, status || 'active']
    );
    const insertResult = result as any;
    const [rows] = await pool.execute('SELECT * FROM events WHERE id = ?', [insertResult.insertId]);
    const items = rows as any[];
    res.status(201).json({ success: true, message: 'Event created successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create event.' });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, date, location, image, status } = req.body;
    const [result] = await pool.execute(
      'UPDATE events SET title=?, description=?, date=?, location=?, image=?, status=?, updated_at=NOW() WHERE id=?',
      [title, description, date, location, image || null, status, req.params.id]
    );
    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Event not found.' });
      return;
    }
    const [rows] = await pool.execute('SELECT * FROM events WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    res.json({ success: true, message: 'Event updated successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update event.' });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.execute('DELETE FROM events WHERE id = ?', [req.params.id]);
    const deleteResult = result as any;
    if (deleteResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Event not found.' });
      return;
    }
    res.json({ success: true, message: 'Event deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete event.' });
  }
};
