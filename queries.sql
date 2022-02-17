

SELECT COUNT(comments.comment_id)::int AS comment_count FROM comments WHERE article_id = $1 GROUP BY article_id;;