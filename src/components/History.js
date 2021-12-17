import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import { Link } from "react-router-dom";

class History extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoaded: true,
    };
  }

  componentDidMount() {
    this.setState({ isLoaded: false });
  }
  getUserID = (event) => {
    let userID = event.currentTarget.getAttribute("id");
    this.props.getID(userID);
  };
  creatingComponent = () => {
    if (this.state.isLoaded) {
      return <Loader />;
    } else {
      return this.props.history.map((item) => (
        <Link
          onClick={this.getUserID}
          key={item.givenID}
          to="/user"
          id={item.userID}
        >
          {
            <p>
              <span> &#62; </span> <span> {item.fullName}</span>
            </p>
          }
        </Link>
      ));
    }
  };
  render() {
    return <div className="history">{this.creatingComponent()}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    history: state.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getID: (id) => {
      dispatch({ type: "GET_USER_ID", id: id });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
