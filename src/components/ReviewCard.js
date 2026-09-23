import React from 'react';
import '../styles/review.css';

const ReviewCard = ({ title, onEdit, items = [], badges = [] }) => {
  return (
    <div className="review-card">
      <div className="review-header">
        <h4 className="review-title">{title}</h4>
        <button
          type="button"
          onClick={onEdit}
          className="btn-edit"
          aria-label={`Edit ${title}`}
        >
          Edit
        </button>
      </div>

      <div className="review-content">
        {items.map((item, index) => (
          <div key={index} className="review-item-row">
            <span className="review-item-label">{item.label}</span>
            {item.value ? (
              <span className="review-item-value">{item.value}</span>
            ) : (
              <span className="review-item-value empty-value">
                Not provided
              </span>
            )}
          </div>
        ))}

        {badges && badges.length > 0 && (
          <div className="badge-list">
            {badges.map((badge, idx) => (
              <span key={idx} className="tech-badge">
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
