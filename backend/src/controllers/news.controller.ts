import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, limit } = req.query;
    let query = 'SELECT * FROM news';
    const params: any[] = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    } else {
      query += " WHERE status = 'published'";
    }

    query += ' ORDER BY published_date DESC';

    if (limit) {
      query += ' LIMIT ?';
      params.push(parseInt(limit as string));
    }

    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetAllNews error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch news.' });
  }
};

export const getAllNewsAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM news ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('GetAllNewsAdmin error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch news.' });
  }
};

export const getNewsById = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM news WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    if (items.length === 0) {
      res.status(404).json({ success: false, message: 'News not found.' });
      return;
    }
    res.json({ success: true, data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch news.' });
  }
};

export const createNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, description, image, published_date, status } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO news (title, category, description, image, published_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      [title, category, description, image || null, published_date || new Date(), status || 'draft']
    );
    const insertResult = result as any;
    const [rows] = await pool.execute('SELECT * FROM news WHERE id = ?', [insertResult.insertId]);
    const items = rows as any[];
    res.status(201).json({ success: true, message: 'News created successfully.', data: items[0] });
  } catch (error) {
    console.error('CreateNews error:', error);
    res.status(500).json({ success: false, message: 'Failed to create news.' });
  }
};

export const updateNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, category, description, image, published_date, status } = req.body;
    const [result] = await pool.execute(
      'UPDATE news SET title=?, category=?, description=?, image=?, published_date=?, status=?, updated_at=NOW() WHERE id=?',
      [title, category, description, image || null, published_date, status, req.params.id]
    );
    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'News not found.' });
      return;
    }
    const [rows] = await pool.execute('SELECT * FROM news WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    res.json({ success: true, message: 'News updated successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update news.' });
  }
};

export const deleteNews = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.execute('DELETE FROM news WHERE id = ?', [req.params.id]);
    const deleteResult = result as any;
    if (deleteResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'News not found.' });
      return;
    }
    res.json({ success: true, message: 'News deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete news.' });
  }
};
