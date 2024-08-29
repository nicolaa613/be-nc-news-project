const db = require("../db/connection");

exports.selectArticles = () => {
  const articlesQuery = `
        SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.article_id) AS comment_count
        FROM articles
        LEFT OUTER JOIN comments ON articles.article_id = comments.article_id
        GROUP BY articles.article_id
        ORDER BY created_at DESC
        `;

  return db.query(articlesQuery).then((data) => {
    const articlesData = data.rows
    return articlesData;
  });
};
