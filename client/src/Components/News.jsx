import React, { useState, useEffect } from "react";
import defaultImage from "../assets/no-image-available.png";
import * as API from "../api";

export default function News(props) {
  const [news, setNews] = useState({});

  useEffect(() => {
    const getArticles = async () => {
      const { articles } = await API.getNews();
      let index = 0;
      setNews(articles[index]);

      // Every 10s, show next article
      // repeat after looping
      const articleFlip = setInterval(() => {
        index++;
        if (index === articles.length) index = 0;
        setNews(articles[index]);
      }, 10000);

      // Every 10m, clear interval & refresh articles
      setTimeout(() => {
        clearInterval(articleFlip);
        getArticles();
      }, 600000);
    };

    getArticles();
  }, [setNews]);

  const styles = {
    wrapper: {
      width: "60vw",
      height: "60vh",
      position: "relative",
      backgroundColor: "#191616",
    },
    img: {
      width: "100%",
      height: "50vh",
    },
    container: {
      position: "absolute",
      backgroundColor: "#191616",
      minHeight: "50px",
      bottom: 0,
      width: "calc(100% - 20px)",
      padding: 10,
      borderRadius: "0 0 10px",
    },
    articleTitle: {
      fontWeight: 700,
      fontSize: 60,
      textAlign: "center",
      color: "#e8e8e8",
    },
    source: {
      float: "right",
      fontSize: 24,
      color: "#b3adad",
    },
  };

  if (!news.title) return null;
  const { title, urlToImage, source } = news;
  // Remove " - [source name]" from article title since source is displayed seperately
  const articleTitle = title.slice(0, title.lastIndexOf("-"));

  return (
    <div style={props.style}>
      <img src={urlToImage || defaultImage} style={styles.img} alt={articleTitle} />
      <div style={styles.container}>
        <div style={styles.articleTitle}>{articleTitle}</div>
        <div style={styles.source}>Source: {source.name}</div>
      </div>
    </div>
  );
}
