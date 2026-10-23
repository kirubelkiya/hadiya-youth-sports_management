/**
 * Migration: creates the registration_submissions table.
 * Run with: npm run migrate:registrations
 */
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3309'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hadiya_zone_db',
  });

  console.log('🔧 Running registration_submissions migration...');

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS registration_submissions (
      id            INT AUTO_INCREMENT PRIMARY KEY,
      type          ENUM('sport', 'event', 'vacancy') NOT NULL,
      full_name     VARCHAR(150) NOT NULL,
      email         VARCHAR(150) NOT NULL,
      phone         VARCHAR(30)  NOT NULL,
      age           INT,
      gender        ENUM('male','female','other'),
      -- Sport fields
      sport_name    VARCHAR(100),
      experience    VARCHAR(50),
      -- Event fields
      event_name    VARCHAR(255),
      -- Vacancy fields
      position      VARCHAR(150),
      education     VARCHAR(100),
      cv_link       VARCHAR(500),
      -- Common
      message       TEXT,
      status        ENUM('pending','reviewed','accepted','rejected') NOT NULL DEFAULT 'pending',
      created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ registration_submissions table is ready.');
  await connection.end();
  process.exit(0);
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
