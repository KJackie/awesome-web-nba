import React, { useEffect, useState } from "react";
import "./News.scss";
import domain from "../../util/domain";
function News() {
  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch(`${domain}/news`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);
  return (
    <div className="news-container">
      {news.map((item, index) => {
        return (
          <div className="news-box">
            <div className="img-wrapper" key={index}>
              <img src={item.images[0].url} alt="news" />
            </div>

            <div className="news-text">
              <p className="headline">{item.headline}</p>
              <a href={item.links.web.href}> Read at ESPN.com </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default News;
