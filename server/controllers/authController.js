import pool from '../db/index.js';

// POST /api/v1/register/
export const createUser = (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    console.log(name, email, password);
  } catch (error) {
    error.statusCode = 400;
    return next(error);
  }
};
