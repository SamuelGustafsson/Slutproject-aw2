// Responible for the view layer
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./root-actions";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./Header";
import Login from "../login/login-component";
import SignUp from "../registration/registration-component";
import NewsList from "../news/news";
import Footer from "./Footer";
import NewsNew from "../news/news-create";
import SelectedNewsItem from "../news/news-item-show";
import AdminDashboard from "./Admin_Dashboard";
import UserList from "./User_list";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header auth={auth} />
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/admin/users" component={UserList} />
              <Route path="/admin" component={AdminDashboard} />
              <Route path="/signup" component={SignUp} />
              <Route path="/new" component={NewsNew} />
              <Route path="/:newsid" component={SelectedNewsItem} />
              <Route path="/" exact component={NewsList} />
            </Switch>
            <Route path="/" component={Footer} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export const filterNewsByTag = (tag, news) =>
  news.filter(newsItem => newsItem.tags.some(itemTag => itemTag === tag));

// News Configure
const mapStateToProps = ({ auth, page, news: { news } }) => {
  const { selectedTag } = page.news;

  return {
    news: selectedTag ? filterNewsByTag(selectedTag, news) : news,
    auth
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchUser: () => actions.fetchUser(),
      fetchUsers: () => actions.fetchUsers(),
      filterNewsByTag: tag => actions.activeNewsTag(tag)
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
