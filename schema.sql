CREATE TABLE users (
  user_id varchar(20) NOT NULL,
  username varchar(100),
  email varchar(100) NOT NULL,
  password_hash varchar(100) NOT NULL,
  joined_date datetime NOT NULL,
  avatar_url varchar(255) DEFAULT 'https://bit.ly/3SAIthR',
  bio varchar(255),
  location varchar(50),
  followers int DEFAULT '0',
  following int DEFAULT '0',
  is_admin tinyint(1) DEFAULT '0',
  mobile varchar(15),
  PRIMARY KEY (user_id),
  UNIQUE KEY email (email)
);

create table posts (
  post_id varchar(40) NOT NULL UNIQUE,
  author_id varchar(20) NOT NULL,
  post_content varchar(200) NOT NULL,
  media_url varchar(300),
  likes int DEFAULT 0,
  comments int DEFAULT 0,
  created_date datetime NOT NULL,
  PRIMARY KEY(post_id),
  FOREIGN KEY(author_id) REFERENCES users(user_id)
);

create table comments (
  comment_id varchar(40) UNIQUE NOT NULL,
  user_id varchar(20),
  post_id varchar(40),
  comment varchar(200),
  PRIMARY KEY(comment_id),
  FOREIGN KEY(user_id) REFERENCES users(user_id),
  FOREIGN KEY(post_id) REFERENCES posts(post_id)
);

create table chats (
  chat_id  varchar(40) PRIMARY KEY UNIQUE NOT NULL,
  sender_id varchar(20),
  reciver_id varchar(20),
  message varchar(255),
  sent_date datetime,
  FOREIGN KEY(sender_id) REFERENCES users(user_id),
  FOREIGN KEY(reciver_id) REFERENCES users(user_id)
);

create table conversation (
  conversation_id int auto_increment not null primary key,
	user1 varchar(40),
  user2 varchar(40),
  last_message varchar(200),
  sent_date datetime,
  FOREIGN KEY(user1) REFERENCES users(user_id),
  FOREIGN KEY(user2) REFERENCES users(user_id)
);