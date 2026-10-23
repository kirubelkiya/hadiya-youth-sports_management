import { Request, Response } from 'express';
import pool from '../config/database';

export const getAllGallery = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    let query = "SELECT * FROM gallery WHERE status = 'active'";
    const params: any[] = [];
    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }
    query += ' ORDER BY created_at DESC';
    const [rows] = await pool.execute(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch gallery.' });
  }
};

export const getAllGalleryAdmin = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM gallery ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch gallery.' });
  }
};

export const getGalleryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    if (items.length === 0) {
      res.status(404).json({ success: false, message: 'Gallery item not found.' });
      return;
    }
    res.json({ success: true, data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch gallery item.' });
  }
};

export const createGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, media_type, media_url, category, status } = req.body;
    const [result] = await pool.execute(
      'INSERT INTO gallery (title, media_type, media_url, category, status) VALUES (?, ?, ?, ?, ?)',
      [title, media_type || 'photo', media_url, category || 'general', status || 'active']
    );
    const insertResult = result as any;
    const [rows] = await pool.execute('SELECT * FROM gallery WHERE id = ?', [insertResult.insertId]);
    const items = rows as any[];
    res.status(201).json({ success: true, message: 'Gallery item created successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create gallery item.' });
  }
};

export const updateGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, media_type, media_url, category, status } = req.body;
    const [result] = await pool.execute(
      'UPDATE gallery SET title=?, media_type=?, media_url=?, category=?, status=?, updated_at=NOW() WHERE id=?',
      [title, media_type, media_url, category, status, req.params.id]
    );
    const updateResult = result as any;
    if (updateResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Gallery item not found.' });
      return;
    }
    const [rows] = await pool.execute('SELECT * FROM gallery WHERE id = ?', [req.params.id]);
    const items = rows as any[];
    res.json({ success: true, message: 'Gallery item updated successfully.', data: items[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update gallery item.' });
  }
};

export const deleteGalleryItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const [result] = await pool.execute('DELETE FROM gallery WHERE id = ?', [req.params.id]);
    const deleteResult = result as any;
    if (deleteResult.affectedRows === 0) {
      res.status(404).json({ success: false, message: 'Gallery item not found.' });
      return;
    }
    res.json({ success: true, message: 'Gallery item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete gallery item.' });
  }
};

export const getDashboardStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [[newsCount]] = await pool.execute('SELECT COUNT(*) as count FROM news') as any;
    const [[eventsCount]] = await pool.execute('SELECT COUNT(*) as count FROM events') as any;
    const [[youthCount]] = await pool.execute('SELECT COUNT(*) as count FROM youth_programs') as any;
    const [[sportsCount]] = await pool.execute('SELECT COUNT(*) as count FROM sports') as any;
    const [[achievementsCount]] = await pool.execute('SELECT COUNT(*) as count FROM achievements') as any;
    const [[galleryCount]] = await pool.execute('SELECT COUNT(*) as count FROM gallery') as any;
    const [recentNews] = await pool.execute('SELECT * FROM news ORDER BY created_at DESC LIMIT 5') as any;
    const [upcomingEvents] = await pool.execute("SELECT * FROM events WHERE date >= CURDATE() ORDER BY date ASC LIMIT 5") as any;

    res.json({
      success: true,
      data: {
        stats: {
          news: newsCount.count,
          events: eventsCount.count,
          youthPrograms: youthCount.count,
          sports: sportsCount.count,
          achievements: achievementsCount.count,
          gallery: galleryCount.count,
        },
        recentNews,
        upcomingEvents,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard data.' });
  }
};
