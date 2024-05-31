"use client";

import { useEffect, useState } from "react";

interface NewsProps {
  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsProps[]>([]);
  const [articleNum, setArticleNum] = useState(3);

  useEffect(() => {
    fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  return (
    <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2">
      <h4 className="font-bold text-xl px-4"> What is happening</h4>
      {news.slice(0, articleNum).map((article) => (
        <div key={article.url}>
          <a href={article.url} target="_blank">
            <div className="flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-200 transition duration-200">
              <div className="space-y-0.5">
                <h6 className="text-sm font-bold">{article.title}</h6>
                <p className="text-xs font-medium text-gray-500 ">
                  {article.source.name}
                </p>
              </div>
              <img src={article.urlToImage} width={70} height={70} alt="article-img" className="rounded-xl" />
            </div>
          </a>
        </div>
      ))}
      <button
        onClick={() => setArticleNum(articleNum + 3)}
        className="text-blue-300 hover:text-blue-300 pl-4 pb-3 text-sm"
      >
        See more
      </button>
    </div>
  );
};

export default NewsFeed;
