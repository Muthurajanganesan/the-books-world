-- Create USERS table first (parent table)
CREATE TABLE IF NOT EXISTS USERS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    second_name VARCHAR(255),
    last_name VARCHAR(255),
    mobile_number VARCHAR(10),
    alternate_mobile_number VARCHAR(10),
    address VARCHAR(255),
    city VARCHAR(255),
    state VARCHAR(255),
    zip_code VARCHAR(10),
    details_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create BOOKS table (independent)
CREATE TABLE IF NOT EXISTS BOOKS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    author VARCHAR(255),
    category VARCHAR(255),
    description VARCHAR(1000),
    price DECIMAL(10, 2),
    sale_price DECIMAL(10, 2),
    on_sale BOOLEAN,
    quantity INTEGER,
    image_url VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create CART table (references USERS)
CREATE TABLE IF NOT EXISTS CART (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    book_id BIGINT,
    quantity INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

-- Create ORDERS table (references USERS)
CREATE TABLE IF NOT EXISTS ORDERS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    total_amount DECIMAL(10, 2),
    order_status VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(id)
);

-- Create ORDER_ITEMS table (references ORDERS and BOOKS)
CREATE TABLE IF NOT EXISTS ORDER_ITEMS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    order_id BIGINT NOT NULL,
    book_id BIGINT,
    quantity INTEGER,
    price DECIMAL(10, 2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES ORDERS(id)
);

-- Create PAYMENTS table (references USERS and ORDERS)
CREATE TABLE IF NOT EXISTS PAYMENTS (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    order_id BIGINT,
    amount DECIMAL(10, 2),
    payment_method VARCHAR(50),
    payment_status VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES USERS(id),
    FOREIGN KEY (order_id) REFERENCES ORDERS(id)
);
