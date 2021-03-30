import pool from '../db/index.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await pool.query('SELECT name, email FROM users WHERE user_unique = $1', [req.user]);
    return res.json({ ...user.rows[0] });
  } catch (error) {
    next(error);
  }
};
