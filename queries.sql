
\c nc_news_test      

"INSERT INTO comments (article_id, author, body) VALUES ($1, $2, $3)RETURNING *;",
      [id, username, body]