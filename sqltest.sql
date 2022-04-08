\c nc_news_test



SELECT articles.*, COUNT(comments.votes)::int AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id WHERE articles.topic = 'mitch'  GROUP BY articles.article_id ORDER BY votes asc;

