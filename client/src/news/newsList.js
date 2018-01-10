import React, { Component } from 'react';
import NewsListItem from './newslist-item';

export default class NewsList extends Component {

    render() {
        // TODO: Destruction props. 
        const { news, newsFiltered } = this.props;

        const newsToRender = newsFiltered.length > 0 ? newsFiltered : news;

        const newsItemsList = newsToRender.map((newsItem) =>
            <NewsListItem onNewsTagClick={this.props.handleSelectedTag} onNewsClick={this.props.handleSelectedNews} key={newsItem._id} {...newsItem} />
        );

        return (
            <div className="col s12">

                {newsItemsList}
                <div className="center"><a className="waves-effect waves-light btn"><i className="material-icons right">arrow_drop_down</i>Läs mer...</a></div>
            </div>
        )
    }
}