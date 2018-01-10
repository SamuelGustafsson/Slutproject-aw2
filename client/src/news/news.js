// Responible for the view layer
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../app/root-actions";

import NewsList from "./newsList";
import Preloader from "../app/preloader-component";

class NewsPage extends Component {
  componentDidMount() {
    this.props.fetchNews();
  }

  render() {
    const { news, newsFiltered } = this.props;

    return (
      <div>
        <div className="container">
          <div className="row">
            <Link className="waves-effect waves-light btn right" to="/new">
              Add News
            </Link>
          </div>
          {this.props.NewsIsLoading ? (
            <Preloader />
          ) : (
            <NewsList
              handleSelectedTag={this.props.handleSelectedNewsTag}
              handleSelectedNews={this.props.handleSelectedNews}
              news={news}
              newsFiltered={newsFiltered}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ page, news: { news, isLoading, ...rest } }) => {
  return {
    news,
    newsFiltered: news.filter(newsItem =>
      newsItem.tags.some(tag => tag === page.news.selectedTag)
    ),
    NewsIsLoading: isLoading
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchNews: () => actions.newsFetchData(),
      handleSelectedNewsTag: tag => actions.activeNewsTag(tag),
      handleSelectedNews: newsItem => actions.activeNewsItem(newsItem)
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
