import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllAchievements = async (req: Request, res: Response): Promise<void> => {
  try {
    const { limit } = req.query;
    let query = "SELECT * FROM achievements WHERE status = 'active' ORDER BY year DESC";
    const params: any[] = [];
    if (limit) {
      query = "SELECT * FROM achievements WHERE status = 'active' ORDER BY year DESC LIMIT ?";
      params.push(parseInt(limit as string));
    }
    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch achievements.' });
  }
};

export const getAllAchievementsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM achievements ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch achievements.' });
  }
};

export const getAchievementById = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM achievements WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    if (items.length === 0) {
      res.status(404).json({ success: false, message: 'Achievement not found.' });
      return;
    }
    res.json({ success: true, data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch achievement.' });
  }
};

export const createAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, year, image, status } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO achievements (title, description, year, image, status) VALUES (?, ?, ?, ?, ?)',
      [title, description, year, image || null, status || 'active']
    );
    const insertResult = result as any;
    const [rows] = await pool.execute('SELECT * FROM achievements WHERE id = ?', [insertResult.insertId]);
    const items = rows as any[];
    res.status(201).json({ success: true, message: 'Achievement created successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create achievement.' });
  }
};

export const updateAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, year, image, status } = req.body;
    const [result] = await pool.execute(
      'UPDATE achievements SET title=?, description=?, year=?, image=?, status=?, updated_at=NOW() WHERE id=?',
      [title, description, year, image || null, status, req.params.id]
    );
    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Achievement not found.' });
      return;
    }
    const [rows] = await pool.execute('SELECT * FROM achievements WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    res.json({ success: true, message: 'Achievement updated successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update achievement.' });
  }
};

export const deleteAchievement = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.execute('DELETE FROM achievements WHERE id = ?', [req.params.id]);
    const deleteResult = result as any;
    if (deleteResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Achievement not found.' });
      return;
    }
    res.json({ success: true, message: 'Achievement deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete achievement.' });
  }
};
