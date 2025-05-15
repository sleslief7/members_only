const pool = require('./pool');

const queryAllPosts = async () => {
  const { rows } = await pool.query(
    'SELECT * FROM posts ORDER BY created_at DESC'
  );
  return rows;
};

const queryPostById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM posts WHERE id = $1`, [id]);
  return rows[0];
};

const queryCreatePost = async (title, content, userId) => {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`,
    [title, content, userId]
  );
  return rows[0];
};

const queryDeletePostById = async (id) => {
  const { rows } = await pool.query(
    `DELETE FROM posts WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0];
};

const queryUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0];
};

const queryUserByUsername = async (username) => {
  const { rows } = await pool.query(
    `SELECT id, first_name, last_name, username, created_at, is_member, is_admin FROM users WHERE username = $1`,
    [username]
  );
  return rows[0];
};

const getFullUserByUsername = async (username) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return rows[0];
};

const queryCreateUser = async (user) => {
  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING *`,
    [user.firstName, user.lastName, user.username, user.password]
  );
  return rows[0];
};

const queryUpdateUser = async (user) => {
  const { id, isAdmin, isMember } = user;
  const { rows } = await pool.query(
    `UPDATE users SET is_member = $1, is_admin = $2 WHERE id = $3 RETURNING *`,
    [isAdmin, isMember, id]
  );
  return rows[0];
};

module.exports = {
  queryAllPosts,
  queryPostById,
  queryCreatePost,
  queryDeletePostById,
  queryUserById,
  queryCreateUser,
  queryUpdateUser,
  queryUserByUsername,
  getFullUserByUsername,
};
