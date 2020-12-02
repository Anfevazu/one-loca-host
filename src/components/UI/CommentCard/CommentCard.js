import React from 'react';
import { Popover } from 'antd';
import moment from 'moment';
import Rating from '../Rating/Rating';

export default class App extends React.Component {
  render() {
    const { singleReview, authorRating } = this.props;
    const reviewAuthorFirstName = singleReview
      ? singleReview.guest.name
      : '';
    const reviewAuthorLastName = singleReview
      ? singleReview.guest.last_name
      : '';
    const authorName = reviewAuthorFirstName + ' ' + reviewAuthorLastName;
    const content = singleReview ? singleReview.comment : '';
    const reviewTitle = singleReview ? singleReview.title : '';
    const commentDate = singleReview ? singleReview.date.toDate() : '';
    const postTime = new Date(commentDate).getTime();
    const authorAvatar = singleReview ? singleReview.guest.picture : '';
    const reviewRating = singleReview ? singleReview.rating : '';

    return (
      <div className="comment-area">
        <div className="comment-wrapper">
          <div className="comment-header">
            <div className="avatar-area">
              <div className="author-avatar">
                <img src={authorAvatar} alt={authorName} />
              </div>
              <div className="author-info">
                <h3 className="author-name">{authorName}</h3>
                {authorRating && (
                  <div className="author-rating">{authorRating}</div>
                )}
                <div className="comment-date">
                  <Popover
                    placement="bottom"
                    content={moment(commentDate).format('MM/DD/YYYY h:mm:ss')}
                  >
                    <span>Escrito - {moment(postTime).fromNow()}</span>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
          <div className="comment-body">
            <h4>{reviewTitle}</h4>
            <p>{content}</p>
          </div>

            <Rating rating={reviewRating} type="bulk" style={{color: '#ffcf2a !important'}}/>

        </div>
      </div>
    );
  }
}
