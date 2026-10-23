import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3309');
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'hadiya_zone_db';

async function seed() {
  // Connect without database first to create it
  const rootConnection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
  });

  console.log('📦 Creating database...');
  await rootConnection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await rootConnection.end();

  // Connect to database
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

  console.log('🏗️  Creating tables...');

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role ENUM('ADMIN') NOT NULL DEFAULT 'ADMIN',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS news (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(500),
      published_date DATE NOT NULL,
      status ENUM('published', 'draft') NOT NULL DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      date DATE NOT NULL,
      location VARCHAR(255) NOT NULL,
      image VARCHAR(500),
      status ENUM('active', 'cancelled', 'completed') NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS youth_programs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(500),
      status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS sports (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      image VARCHAR(500),
      status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS achievements (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      year YEAR NOT NULL,
      image VARCHAR(500),
      status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      is_read TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS gallery (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      media_type ENUM('photo', 'video') NOT NULL DEFAULT 'photo',
      media_url VARCHAR(500) NOT NULL,
      category VARCHAR(100) NOT NULL DEFAULT 'general',
      status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log('✅ Tables created successfully.');

  // ── Admin User ──────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash('Admin@1234', 12);
  await connection.execute(
    `INSERT INTO users (name, email, password, role)
     VALUES (?, ?, ?, 'ADMIN')
     ON DUPLICATE KEY UPDATE name = VALUES(name)`,
    ['Admin', 'admin@hadiyazone.gov.et', hashedPassword]
  );

  // ── News ─────────────────────────────────────────────────────
  await connection.execute(`DELETE FROM news`);
  const newsRows: [string, string, string, string, string, string][] = [
    ['Hadiya Zone Youth Development Summit 2026', 'Youth',
     'The Hadiya Zone Youth and Sports Department successfully hosted its annual Youth Development Summit, bringing together over 500 young people from across the zone to discuss opportunities, challenges, and the future of youth empowerment in the region.',
     'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', '2026-08-10', 'published'],
    ['Regional Football Championship Results', 'Sports',
     'Hadiya Zone football team achieved a historic victory in the regional championship, defeating neighboring zones and qualifying for the national tournament. The team demonstrated exceptional teamwork and sportsmanship throughout the competition.',
     'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800', '2026-08-05', 'published'],
    ['New Youth Skills Training Center Opens in Hossana', 'Youth',
     'A state-of-the-art youth skills training center has officially opened in Hossana, the capital of Hadiya Zone. The facility will provide vocational training, entrepreneurship courses, and leadership development programs for young people aged 15-29.',
     'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', '2026-07-28', 'published'],
    ['Athletics Team Wins Gold at Zone Games', 'Sports',
     'Our athletics team brought home multiple gold medals from the Zone Games held in Hawassa. Athletes from Hadiya Zone excelled in track and field events, showcasing the results of months of dedicated training.',
     'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800', '2026-07-20', 'published'],
    ['Youth Entrepreneurship Competition Winners Announced', 'Youth',
     'The department announced the winners of the annual Youth Entrepreneurship Competition. Ten outstanding young entrepreneurs received seed funding and mentorship support to launch their business ideas in the community.',
     'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800', '2026-07-15', 'published'],
  ];
  for (const row of newsRows) {
    await connection.execute(
      'INSERT INTO news (title, category, description, image, published_date, status) VALUES (?, ?, ?, ?, ?, ?)',
      row
    );
  }

  // ── Events ────────────────────────────────────────────────────
  await connection.execute(`DELETE FROM events`);
  const eventRows: [string, string, string, string, string, string][] = [
    ['Hadiya Zone Youth Leadership Forum 2026',
     'An interactive forum bringing together young leaders from across Hadiya Zone to discuss community development, innovation, and youth empowerment. Guest speakers, panel discussions, and networking opportunities will be available.',
     '2026-09-15', 'Hossana Cultural Center, Hossana',
     'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 'active'],
    ['Annual Sports Day and Exhibition',
     'Celebrate the spirit of sport at our annual Sports Day event. Watch demonstrations from various sports including football, athletics, volleyball, and basketball. Open to all community members.',
     '2026-09-20', 'Hossana Sports Stadium',
     'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', 'active'],
    ['Youth Skills and Innovation Fair',
     'Showcase of youth talent, skills, and innovative projects from across Hadiya Zone. The fair will feature exhibitions, live demonstrations, and competitions in categories including technology, crafts, and agriculture.',
     '2026-10-05', 'Hossana Exhibition Center',
     'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800', 'active'],
    ['Regional Football Tournament',
     'Hadiya Zone hosts the regional inter-zone football tournament. Teams from six zones compete for the championship trophy. Come support our home team!',
     '2026-10-12', 'Hossana Sports Stadium',
     'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800', 'active'],
    ['Community Health and Sports Day',
     'A community-wide health and sports event promoting physical wellness, healthy living, and active lifestyles. Activities include morning runs, yoga sessions, and health screenings.',
     '2026-11-01', 'Hossana Town Park',
     'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800', 'active'],
  ];
  for (const row of eventRows) {
    await connection.execute(
      'INSERT INTO events (title, description, date, location, image, status) VALUES (?, ?, ?, ?, ?, ?)',
      row
    );
  }

  // ── Youth Programs ────────────────────────────────────────────
  await connection.execute(`DELETE FROM youth_programs`);
  const youthRows: [string, string, string, string][] = [
    ['Youth Leadership Development',
     'A comprehensive program designed to identify and nurture leadership potential in young people aged 16-25. Participants develop skills in communication, decision-making, conflict resolution, and community engagement through workshops, seminars, and practical projects.',
     'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', 'active'],
    ['Vocational Skills Training',
     'Practical vocational training programs equipping youth with marketable skills in areas such as construction, ICT, tailoring, electrical work, and other trades. Graduates receive certificates and job placement support.',
     'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', 'active'],
    ['Youth Entrepreneurship Program',
     'Supporting young entrepreneurs with business development training, mentorship, access to micro-financing, and networking opportunities. The program helps youth transform ideas into sustainable businesses that contribute to the local economy.',
     'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800', 'active'],
    ['Community Service and Civic Engagement',
     'Encouraging youth to actively participate in community development through volunteer programs, environmental campaigns, community clean-up drives, and civic education initiatives. Building responsible and engaged citizens.',
     'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800', 'active'],
    ['Youth Health and Wellness Program',
     'Promoting physical and mental health among youth through sports activities, health education workshops, peer counseling programs, and awareness campaigns on nutrition, hygiene, and healthy lifestyles.',
     'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800', 'active'],
    ['Digital Skills and ICT Training',
     'Bridging the digital divide by providing youth with essential computer literacy, internet skills, software training, and digital entrepreneurship knowledge to thrive in the modern economy.',
     'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800', 'active'],
  ];
  for (const row of youthRows) {
    await connection.execute(
      'INSERT INTO youth_programs (title, description, image, status) VALUES (?, ?, ?, ?)',
      row
    );
  }

  // ── Sports ────────────────────────────────────────────────────
  await connection.execute(`DELETE FROM sports`);
  const sportsRows: [string, string, string, string][] = [
    ['Football',
     'Football is the most popular sport in Hadiya Zone. Our department supports multiple football clubs, organizes inter-school and inter-kebele tournaments, and develops talented players for regional and national competitions. We have dedicated coaches and modern training facilities.',
     'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800', 'active'],
    ['Athletics',
     'Hadiya Zone has produced exceptional track and field athletes who compete at regional and national levels. Our athletics program covers sprinting, long distance running, high jump, long jump, and other field events with professional coaching staff.',
     'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800', 'active'],
    ['Volleyball',
     'Both men and women volleyball teams represent Hadiya Zone in regional competitions. The sport is widely played in schools and communities, with regular tournaments organized throughout the year to identify and develop new talent.',
     'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800', 'active'],
    ['Basketball',
     'Our basketball program has grown significantly in recent years. Regular leagues are organized for youth and adult teams, with modern courts available for training and competitions across the zone.',
     'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', 'active'],
    ['Swimming',
     'Swimming facilities and training programs are available for youth and competitive athletes. The department promotes water safety awareness alongside competitive swimming development.',
     'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800', 'active'],
    ['Traditional Sports',
     'Preserving and promoting traditional Ethiopian sports and games as part of our cultural heritage. Events celebrating traditional sports are organized during cultural festivals and community gatherings.',
     'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=800', 'active'],
  ];
  for (const row of sportsRows) {
    await connection.execute(
      'INSERT INTO sports (name, description, image, status) VALUES (?, ?, ?, ?)',
      row
    );
  }

  // ── Achievements ─────────────────────────────────────────────
  await connection.execute(`DELETE FROM achievements`);
  const achievementRows: [string, string, number, string, string][] = [
    ['Regional Football Championship Winners',
     'Hadiya Zone Football Team won the Southern Ethiopia Regional Football Championship, defeating 8 other zones in an exciting tournament final held in Hawassa. This historic victory marked the first regional title for our zone.',
     2025, 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800', 'active'],
    ['Youth Leadership Award — National Recognition',
     'The Department received national recognition for its outstanding Youth Leadership Development Program, awarded by the Federal Ministry of Youth and Sports for innovative approaches to youth empowerment and community engagement.',
     2025, 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', 'active'],
    ['5000 Youth Trained in Vocational Skills',
     'A major milestone was reached as the department successfully trained over 5,000 young people in various vocational skills across Hadiya Zone, with 78% securing employment or starting their own businesses within six months of graduation.',
     2024, 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', 'active'],
    ['Athletics Gold Medals at National Games',
     'Hadiya Zone athletes brought home 7 gold medals, 4 silver medals, and 5 bronze medals from the National Sports Games, the best performance in the zone history, demonstrating the success of our athletics development programs.',
     2024, 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800', 'active'],
    ['Best Youth Department Award',
     'Hadiya Zone Youth and Sports Department was honored as the Best Youth Department in Southern Ethiopia for two consecutive years, recognized for comprehensive programs, community impact, and innovative youth development initiatives.',
     2023, 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800', 'active'],
    ['New Sports Infrastructure Completed',
     'Successful completion of three new sports facilities across Hadiya Zone including a modern gymnasium, upgraded football stadium, and community sports center, providing world-class facilities for athletes and youth.',
     2023, 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800', 'active'],
  ];
  for (const row of achievementRows) {
    await connection.execute(
      'INSERT INTO achievements (title, description, year, image, status) VALUES (?, ?, ?, ?, ?)',
      row
    );
  }

  // ── Gallery ───────────────────────────────────────────────────
  await connection.execute(`DELETE FROM gallery`);
  const galleryRows: [string, string, string, string, string][] = [
    ['Youth Leadership Forum 2025', 'photo', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800', 'youth', 'active'],
    ['Regional Football Championship', 'photo', 'https://images.unsplash.com/photo-1553778263-73a83bab9b0c?w=800', 'sports', 'active'],
    ['Skills Training Workshop', 'photo', 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800', 'youth', 'active'],
    ['Athletics Training Session', 'photo', 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800', 'sports', 'active'],
    ['Community Service Day', 'photo', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800', 'youth', 'active'],
    ['Volleyball Tournament Finals', 'photo', 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800', 'sports', 'active'],
    ['Youth Entrepreneurship Fair', 'photo', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800', 'youth', 'active'],
    ['Basketball League Opening', 'photo', 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', 'sports', 'active'],
    ['Department Award Ceremony', 'photo', 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=800', 'events', 'active'],
    ['Youth Development Summit Video', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'youth', 'active'],
    ['Sports Day Highlights Video', 'video', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'sports', 'active'],
    ['Annual Awards Ceremony 2025', 'photo', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', 'events', 'active'],
  ];
  for (const row of galleryRows) {
    await connection.execute(
      'INSERT INTO gallery (title, media_type, media_url, category, status) VALUES (?, ?, ?, ?, ?)',
      row
    );
  }

  // ── Contact Messages (sample) ────────────────────────────────
  await connection.execute(`DELETE FROM contact_messages`);
  const messageRows: [string, string, string, string, number][] = [
    ['Abebe Kebede',   'abebe@example.com',  'Youth Program Inquiry',    'Hello, I would like to know more about the youth leadership program and how my son can enroll. He is 18 years old and very interested in community development.', 0],
    ['Tigist Haile',   'tigist@example.com', 'Sports Facility Question', 'We are a school from Hossana and want to use the sports stadium for our inter-school competition next month. Please let us know the booking process.', 0],
    ['Dawit Tesfaye',  'dawit@example.com',  'Vocational Training Info',  'I am interested in the vocational skills training program. Can you send me details about available courses, duration, and any fees involved?', 1],
    ['Mekdes Alemu',   'mekdes@example.com', 'Partnership Proposal',     'Our NGO works with youth across SNNPR and we would like to explore a collaboration with your department on entrepreneurship programs. Please contact us.', 1],
  ];
  for (const row of messageRows) {
    await connection.execute(
      'INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES (?, ?, ?, ?, ?)',
      row
    );
  }

  console.log('✅ Seed data inserted successfully.');
  console.log('');
  console.log('🔑 Admin credentials:');
  console.log('   Email:    admin@hadiyazone.gov.et');
  console.log('   Password: Admin@1234');
  console.log('');

  await connection.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
