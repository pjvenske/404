-- drop database library_db;
CREATE DATABASE library_db;
USE library_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'tutor', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  added_by INT NOT NULL,
  category VARCHAR(255) NOT NULL CHECK (category IN ('art', 'mathematics', 'technology')),
  type VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  born SMALLINT NULL,
  died SMALLINT NULL,
  nationality VARCHAR(255) NULL,
  known_for VARCHAR(500) NULL,
  notable_work VARCHAR(500) NULL,
  about TEXT NULL,
  year YEAR NULL,
  medium VARCHAR(255) NULL,
  dimensions VARCHAR(255) NULL,
  location VARCHAR(255) NULL,
  designed_by VARCHAR(255) NULL,
  developer VARCHAR(255) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (added_by) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_category (category),
  INDEX idx_name (name),
  INDEX idx_type (type)
);
commit;
select * from users;
select * from articles;

-- STORED PROCS
DELIMITER $$

CREATE PROCEDURE BrowseArticlesByCategory(IN p_category VARCHAR(255))
BEGIN
    SELECT 
        a.*,
        u.username AS added_by_username
    FROM articles a
    LEFT JOIN users u ON a.added_by = u.id
    WHERE a.category = p_category
    ORDER BY a.name ASC;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE SearchArticlesByKeyword(IN p_keyword VARCHAR(255))
BEGIN
    SELECT 
        a.*,
        u.username AS added_by_username
    FROM articles a
    LEFT JOIN users u ON a.added_by = u.id
    WHERE a.name LIKE CONCAT('%', p_keyword, '%')
    ORDER BY a.name ASC;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GetArticleById(IN p_id INT)
BEGIN
    SELECT 
        a.*,
        u.username AS added_by_username
    FROM articles a
    LEFT JOIN users u ON a.added_by = u.id
    WHERE a.id = p_id;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE AddArticle(
    IN p_added_by INT,
    IN p_category VARCHAR(255),
    IN p_type VARCHAR(255),
    IN p_name VARCHAR(255),
    IN p_born VARCHAR(255),
    IN p_died VARCHAR(255),
    IN p_nationality VARCHAR(255),
    IN p_known_for TEXT,
    IN p_notable_work TEXT,
    IN p_about TEXT,
    IN p_year VARCHAR(255),
    IN p_medium VARCHAR(255),
    IN p_dimensions VARCHAR(255),
    IN p_location VARCHAR(255),
    IN p_designed_by VARCHAR(255),
    IN p_developer VARCHAR(255)
)
BEGIN
    INSERT INTO articles (
        added_by, category, type, name, born, died, nationality,
        known_for, notable_work, about, year, medium,
        dimensions, location, designed_by, developer
    ) VALUES (
        p_added_by, p_category, p_type, p_name, p_born, p_died,
        p_nationality, p_known_for, p_notable_work, p_about,
        p_year, p_medium, p_dimensions, p_location,
        p_designed_by, p_developer
    );

    SELECT LAST_INSERT_ID() AS articleId;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE UpdateArticle(
    IN p_id INT,
    IN p_category VARCHAR(255),
    IN p_type VARCHAR(255),
    IN p_name VARCHAR(255),
    IN p_born VARCHAR(255),
    IN p_died VARCHAR(255),
    IN p_nationality VARCHAR(255),
    IN p_known_for TEXT,
    IN p_notable_work TEXT,
    IN p_about TEXT,
    IN p_year VARCHAR(255),
    IN p_medium VARCHAR(255),
    IN p_dimensions VARCHAR(255),
    IN p_location VARCHAR(255),
    IN p_designed_by VARCHAR(255),
    IN p_developer VARCHAR(255)
)
BEGIN
    UPDATE articles SET
        category = p_category,
        type = p_type,
        name = p_name,
        born = p_born,
        died = p_died,
        nationality = p_nationality,
        known_for = p_known_for,
        notable_work = p_notable_work,
        about = p_about,
        year = p_year,
        medium = p_medium,
        dimensions = p_dimensions,
        location = p_location,
        designed_by = p_designed_by,
        developer = p_developer
    WHERE id = p_id;

    SELECT ROW_COUNT() AS affectedRows;
END $$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE DeleteArticle(IN p_id INT)
BEGIN
    DELETE FROM articles WHERE id = p_id;
    SELECT ROW_COUNT() AS affectedRows;
END $$

DELIMITER ;

CALL BrowseArticlesByCategory('art');
SELECT * FROM ARTICLES;