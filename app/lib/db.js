import { Pool } from 'pg'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
})

console.log('Database connection config:', {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
})

// Query function to execute SQL commands
export async function query(text, params) {
  const client = await pool.connect(); // Acquire a client from the pool
  try {
    const res = await client.query(text, params); // Execute the query
    return res; // Return the result
  } catch (error) {
    console.error('Database query error:', error);
    throw error; // Re-throw the error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
}

// Export the pool instance if needed elsewhere
export { pool };
