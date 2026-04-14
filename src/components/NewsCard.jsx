// File: src/components/news/NewsCard.jsx

import React, { useState } from 'react';
import { FaClock, FaExternalLinkAlt, FaBookmark, FaRegBookmark, FaUser } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { getArticleImage } from '../../utils/thumbnailGenerator';

const NewsCard = ({ article, viewMode = 'grid' }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const timeAgo = formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true });

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked(!bookmarked);
  };

  const handleCardClick = () => {
    if (article.isUserArticle) {
      // Navigate to article detail page (you can implement this)
      window.location.href = `/articles/${article.id}`;
    } else {
      window.open(article.url || article.source?.url, '_blank', 'noopener,noreferrer');
    }
  };

  const getImageUrl = () => {
    if (imageError) {
      return getArticleImage(article);
    }
    return getArticleImage(article);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer p-4 flex gap-4"
      >
        <img
          src={getImageUrl()}
          alt={article.title}
          className="w-32 h-32 object-cover rounded-lg flex-shrink-0"
          onError={handleImageError}
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition">
              {article.title}
            </h3>
            <button
              onClick={handleBookmark}
              className="text-gray-400 hover:text-primary transition flex-shrink-0"
            >
              {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {article.description || article.summary}
          </p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <FaClock />
                {timeAgo}
              </span>
              <span className="px-2 py-1 bg-primary bg-opacity-10 text-primary rounded">
                {article.category}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              {article.isUserArticle && (
                <span className="flex items-center gap-1 text-blue-600">
                  <FaUser size={10} />
                  User Article
                </span>
              )}
              <span className="text-[10px]">{article.source?.name || 'Press India'}</span>
              <FaExternalLinkAlt />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={getImageUrl()}
          alt={article.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
        />
        <div className="absolute top-2 right-2 bg-white bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
          {article.category}
        </div>
        
        {article.isUserArticle && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <FaUser size={10} />
            User Article
          </div>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition flex-1">
            {article.title}
          </h3>
          <button
            onClick={handleBookmark}
            className="text-gray-400 hover:text-primary transition flex-shrink-0"
          >
            {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
          {article.description || article.summary}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
          <span className="flex items-center gap-1">
            <FaClock />
            {timeAgo}
          </span>
          
          <div className="flex items-center gap-2 text-gray-400">
            <span className="text-[10px]">{article.source?.name || 'Press India'}</span>
            <FaExternalLinkAlt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;