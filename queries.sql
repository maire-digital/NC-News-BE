
\c nc_news_test

SELECT articles.*, COUNT(comments.comment_id)::int AS comment_count FROM articles 
LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.article_id = 5 GROUP BY articles.article_id;