import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllYouthPrograms = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit } = req.query;
    let query = "SELECT * FROM youth_programs WHERE status = 'active' ORDER BY created_at DESC";
    const params: any[] = [];
    if (limit) {
      query = "SELECT * FROM youth_programs WHERE status = 'active' ORDER BY created_at DESC LIMIT ?";
      params.push(parseInt(limit as string));
    }
    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch youth programs.' });
  }
};

export const getAllYouthAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM youth_programs ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch youth programs.' });
  }
};

export const getYouthProgramById = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM youth_programs WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    if (items.length === 0) {
      res.status(404).json({ success: false, message: 'Youth program not found.' });
      return;
    }
    res.json({ success: true, data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch youth program.' });
  }
};

export const createYouthProgram = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image, status } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO youth_programs (title, description, image, status) VALUES (?, ?, ?, ?)',
      [title, description, image || null, status || 'active']
    );
    const insertResult = result as any;
    const [rows] = await pool.execute('SELECT * FROM youth_programs WHERE id = ?', [insertResult.insertId]);
    const items = rows as any[];
    res.status(201).json({ success: true, message: 'Youth program created successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create youth program.' });
  }
};

export const updateYouthProgram = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, image, status } = req.body;
    const [result] = await pool.execute(
      'UPDATE youth_programs SET title=?, description=?, image=?, status=?, updated_at=NOW() WHERE id=?',
      [title, description, image || null, status, req.params.id]
    );
    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Youth program not found.' });
      return;
    }
    const [rows] = await pool.execute('SELECT * FROM youth_programs WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    res.json({ success: true, message: 'Youth program updated successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update youth program.' });
  }
};

export const deleteYouthProgram = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.execute('DELETE FROM youth_programs WHERE id = ?', [req.params.id]);
    const deleteResult = result as any;
    if (deleteResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Youth program not found.' });
      return;
    }
    res.json({ success: true, message: 'Youth program deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete youth program.' });
  }
};
