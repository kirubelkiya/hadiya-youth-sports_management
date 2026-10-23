import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllSports = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit } = req.query;
    let query = "SELECT * FROM sports WHERE status = 'active' ORDER BY created_at DESC";
    const params: any[] = [];
    if (limit) {
      query = "SELECT * FROM sports WHERE status = 'active' ORDER BY created_at DESC LIMIT ?";
      params.push(parseInt(limit as string));
    }
    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch sports.' });
  }
};

export const getAllSportsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM sports ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch sports.' });
  }
};

export const getSportById = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM sports WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    if (items.length === 0) {
      res.status(404).json({ success: false, message: 'Sport not found.' });
      return;
    }
    res.json({ success: true, data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch sport.' });
  }
};

export const createSport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image, status } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO sports (name, description, image, status) VALUES (?, ?, ?, ?)',
      [name, description, image || null, status || 'active']
    );
    const insertResult = result as any;
    const [rows] = await pool.execute('SELECT * FROM sports WHERE id = ?', [insertResult.insertId]);
    const items = rows as any[];
    res.status(201).json({ success: true, message: 'Sport created successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create sport.' });
  }
};

export const updateSport = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, image, status } = req.body;
    const [result] = await pool.execute(
      'UPDATE sports SET name=?, description=?, image=?, status=?, updated_at=NOW() WHERE id=?',
      [name, description, image || null, status, req.params.id]
    );
    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Sport not found.' });
      return;
    }
    const [rows] = await pool.execute('SELECT * FROM sports WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    res.json({ success: true, message: 'Sport updated successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update sport.' });
  }
};

export const deleteSport = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.execute('DELETE FROM sports WHERE id = ?', [req.params.id]);
    const deleteResult = result as any;
    if (deleteResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Sport not found.' });
      return;
    }
    res.json({ success: true, message: 'Sport deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete sport.' });
  }
};
