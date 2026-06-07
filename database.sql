-- =====================================================
-- USER MANAGEMENT
-- =====================================================
-- =====================================================
-- USER MANAGEMENT (with enhanced fields)
-- =====================================================
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    gender ENUM('male', 'female') DEFAULT 'male',
    mobile_phone VARCHAR(20),
    address TEXT,
    nationality TEXT,
    specialization ENUM(
        'frontend_development',
        'backend_development',
        'full_stack_development',
        'mobile_development',
        'devops_cloud',
        'data_science_ai',
        'cybersecurity',
        'quality_assurance',
        'ui_ux_design',
        'graphic_design',
        'product_design',
        'project_management',
        'technical_writing',
        'systems_administration',
        'game_development',
        'blockchain_development',
        'embedded_systems',
        'non_technical',
        'other'
    ) DEFAULT 'other',
    status ENUM('active', 'inactive', 'suspended', 'pending') DEFAULT 'pending',
    github_url VARCHAR(500),
    facebook_url VARCHAR(500),
    linkedin_url VARCHAR(500),
    photo_url VARCHAR(500),
    bio TEXT,
    role ENUM('admin', 'volunteer') DEFAULT 'volunteer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- =====================================================
-- USER EXPERIENCE & EDUCATION
-- =====================================================
CREATE TABLE experience (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    location VARCHAR(255),
    start_date DATE,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE education (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    degree VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    field_of_study VARCHAR(255),
    start_date DATE,
    end_date DATE,
    current BOOLEAN DEFAULT FALSE,
    description TEXT,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

CREATE TABLE skills (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    skill_name VARCHAR(255) NOT NULL,
    proficiency_level ENUM('beginner', 'intermediate', 'advanced', 'expert') DEFAULT 'intermediate',
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- =====================================================
-- MEDIA MANAGEMENT
-- =====================================================
CREATE TABLE image_album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE image (
    id INT PRIMARY KEY AUTO_INCREMENT,
    image_album_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt TEXT,
    caption VARCHAR(255),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (image_album_id) REFERENCES image_album(id) ON DELETE CASCADE
);

CREATE TABLE video_album (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE video (
    id INT PRIMARY KEY AUTO_INCREMENT,
    video_album_id INT NOT NULL,
    video_url VARCHAR(500) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    duration INT,
    thumbnail_url VARCHAR(500),
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (video_album_id) REFERENCES video_album(id) ON DELETE CASCADE
);

-- =====================================================
-- BLOG SYSTEM
-- =====================================================
CREATE TABLE blog_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES blog_category(id) ON DELETE SET NULL
);

CREATE TABLE blog (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    title VARCHAR(255) NOT NULL,
    tag VARCHAR(100),
    description1 TEXT,
    description2 TEXT,
    description3 TEXT,
    description4 TEXT,
    image1_url VARCHAR(500),
    image2_url VARCHAR(500),
    image3_url VARCHAR(500),
    image4_url VARCHAR(500),
    url VARCHAR(500),
    image_album_id INT NULL,
    video_album_id INT NULL,
    view_count INT DEFAULT 0,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES blog_category(id) ON DELETE SET NULL,
    FOREIGN KEY (image_album_id) REFERENCES image_album(id) ON DELETE SET NULL,
    FOREIGN KEY (video_album_id) REFERENCES video_album(id) ON DELETE SET NULL
);

-- Blog authors junction table (replacing author1-4 fields)
CREATE TABLE blog_author (
    blog_id INT NOT NULL,
    user_id INT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blog_id, user_id),
    FOREIGN KEY (blog_id) REFERENCES blog(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- =====================================================
-- BLOCK SYSTEM (for reusable content blocks)
-- =====================================================
CREATE TABLE block_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE block (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    parent_id INT,
    title VARCHAR(255) NOT NULL,
    description1 TEXT,
    description2 TEXT,
    description3 TEXT,
    description4 TEXT,
    image1_url VARCHAR(500),
    image2_url VARCHAR(500),
    image3_url VARCHAR(500),
    image4_url VARCHAR(500),
    url VARCHAR(500),
    location_url VARCHAR(500),
    icon_text VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES block_category(id) ON DELETE SET NULL,
    FOREIGN KEY (parent_id) REFERENCES block(id) ON DELETE CASCADE
);

-- =====================================================
-- TEAM MANAGEMENT
-- =====================================================
CREATE TABLE team (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    team_leader_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (team_leader_id) REFERENCES user(id) ON DELETE SET NULL
);

CREATE TABLE team_member (
    id INT PRIMARY KEY AUTO_INCREMENT,
    team_id INT NOT NULL,
    user_id INT NOT NULL,
    role VARCHAR(255),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES team(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    UNIQUE KEY unique_team_member (team_id, user_id)
);

-- =====================================================
-- PROJECT MANAGEMENT
-- =====================================================
CREATE TABLE project_category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id INT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES project_category(id) ON DELETE SET NULL
);

CREATE TABLE project (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    team_id INT NULL,
    title VARCHAR(255) NOT NULL,
    status ENUM('need_volunteers', 'in_progress', 'completed', 'on_hold') DEFAULT 'need_volunteers',
    description1 TEXT,
    description2 TEXT,
    description3 TEXT,
    description4 TEXT,
    image1_url VARCHAR(500),
    image2_url VARCHAR(500),
    image3_url VARCHAR(500),
    image4_url VARCHAR(500),
    project_url VARCHAR(500),
    image_album_id INT NULL,
    video_album_id INT NULL,
    view_count INT DEFAULT 0,
    published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES project_category(id) ON DELETE SET NULL,
    FOREIGN KEY (team_id) REFERENCES team(id) ON DELETE SET NULL,
    FOREIGN KEY (image_album_id) REFERENCES image_album(id) ON DELETE SET NULL,
    FOREIGN KEY (video_album_id) REFERENCES video_album(id) ON DELETE SET NULL
);

-- =====================================================
-- COMMENTS SYSTEM (unified for blog & project)
-- =====================================================
CREATE TABLE comment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    target_type ENUM('blog', 'project') NOT NULL,
    target_id INT NOT NULL,
    user_id INT NULL,
    username VARCHAR(255),
    content TEXT NOT NULL,
    status ENUM('pending', 'approved') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE SET NULL,
    INDEX idx_target (target_type, target_id),
    INDEX idx_status (status)
);

-- =====================================================
-- MESSAGING SYSTEM
-- =====================================================
CREATE TABLE message (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    to_id INT,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    status ENUM('unread', 'read', 'replied') DEFAULT 'unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (to_id) REFERENCES user(id) ON DELETE SET NULL
);

-- =====================================================
-- PERFORMANCE INDEXES
-- =====================================================
-- User related indexes
CREATE INDEX idx_experience_user_id ON experience(user_id);
CREATE INDEX idx_education_user_id ON education(user_id);
CREATE INDEX idx_skills_user_id ON skills(user_id);

-- Team related indexes
CREATE INDEX idx_team_member_team_id ON team_member(team_id);
CREATE INDEX idx_team_member_user_id ON team_member(user_id);

-- Project related indexes
CREATE INDEX idx_project_category_id ON project(category_id);
CREATE INDEX idx_project_team_id ON project(team_id);
CREATE INDEX idx_project_status ON project(status);

-- Blog related indexes
CREATE INDEX idx_blog_category_id ON blog(category_id);
CREATE INDEX idx_blog_published_at ON blog(published_at);
CREATE INDEX idx_blog_view_count ON blog(view_count);

-- Block related indexes
CREATE INDEX idx_block_category_id ON block(category_id);
CREATE INDEX idx_block_parent_id ON block(parent_id);
CREATE INDEX idx_block_is_active ON block(is_active);

-- Comment related indexes
CREATE INDEX idx_comment_target ON comment(target_type, target_id);
CREATE INDEX idx_comment_user_id ON comment(user_id);
CREATE INDEX idx_comment_status ON comment(status);

-- Message related indexes
CREATE INDEX idx_message_to_id ON message(to_id);
CREATE INDEX idx_message_status ON message(status);
CREATE INDEX idx_message_created_at ON message(created_at);
