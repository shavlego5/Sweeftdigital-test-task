import React, { Component } from "react";
import axios from "axios";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const api = axios.create({
  baseURL: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/`,
});

class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoaded: true,
      page: 1,
      itemsPerPage: 20,
      loader: true,
    };
  }

  getData = () => (
    this.setState({ loader: true }),
    api
      .get(`/user/${this.state.page}/${this.state.itemsPerPage}`)
      .then((res) => {
        this.setState({ data: [...this.state.data, res.data] });
        this.setState({ isLoaded: false });
        this.setState({ loader: false });
      })
  );

  getUserID = (event) => {
    let userID = event.currentTarget.getAttribute("id");
    let fullName = event.currentTarget.getAttribute("fullname");
    let historyItem = {};
    historyItem.userID = userID;
    historyItem.fullName = fullName;
    historyItem.givenID = this.props.givenID;
    this.props.getID(userID);
    this.props.history(historyItem);
  };

  componentDidMount() {
    this.getData();
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        this.state.data[this.state.data.length - 1].pagination.nextPage !== null
      ) {
        this.setState({ page: this.state.page + 1 });
        this.getData();
      }
    });
  }

  creatingComponent = () => {
    if (this.state.isLoaded) {
      return <Loader />;
    } else {
      return (
        <>
          {this.state.data.map((item) =>
            item.list.map((list) => (
              <Link
                onClick={this.getUserID}
                to="/user"
                key={list.id}
                id={list.id}
                fullname={list.prefix + " " + list.name + " " + list.lastName}
                className="box"
              >
                <div>
                  <img
                    src={list.imageUrl + "/animals/" + list.id}
                    alt={list.name + " " + list.lastName}
                  />
                </div>
                <h3>{list.prefix + " " + list.name + " " + list.lastName}</h3>
                <p>{list.title}</p>
              </Link>
            ))
          )}
          {this.state.loader ? <Loader /> : null}
        </>
      );
    }
  };
  render() {
    return (
      <div className="home-page">
        <div className="box-container">{this.creatingComponent()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    givenID: state.givenID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getID: (id) => {
      dispatch({ type: "GET_USER_ID", id: id });
    },
    history: (item) => {
      dispatch({ type: "MAKE_HISTORY", item: item });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
