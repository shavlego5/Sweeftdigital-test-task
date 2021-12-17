import React, { Component } from "react";
import { connect } from "react-redux";
import Loader from "./Loader";
import axios from "axios";
import Friends from "./Friends";
import History from "./History";

const api = axios.create({
  baseURL: `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/`,
});

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      userID: 0,
      isLoaded: true,
    };
  }

  componentDidMount() {
    this.setState({ userID: this.props.userID });
    setTimeout(() => {
      this.getData();
    }, 10);
  }

  getData = () => (
    this.setState({ loader: true }),
    api.get(`/user/${this.state.userID}/`).then((res) => {
      this.setState({ data: res.data });
      console.log(this.state.data);
      this.setState({ isLoaded: false });
    })
  );

  creatingComponent = () => {
    if (this.state.isLoaded) {
      return <Loader />;
    } else {
      let data = this.state.data;
      let address = data.address;
      return (
        <div className="user-info">
          <img src={data.imageUrl + "/animals/" + data.id} alt="not found" />
          <fieldset>
            <legend>Info</legend>
            <h3>{data.prefix + " " + data.name + " " + data.lastName}</h3>
            <p>{data.title}</p>
            <p>
              <span>Email:</span>
              <span>{data.email}</span>
            </p>
            <p>
              <span>Ip Address:</span>
              <span>{data.ip}</span>
            </p>
            <p>
              <span>Ip Address:</span>
              <span>{data.ip}</span>
            </p>
            <p>
              <span>Job Area:</span>
              <span>{data.jobArea}</span>
            </p>
            <p>
              <span>Job Type:</span>
              <span>{data.jobType}</span>
            </p>
          </fieldset>
          <fieldset>
            <legend>Address</legend>
            <h3>{data.company.name + " " + data.company.suffix}</h3>
            <p>
              <span>City:</span>
              <span>{address.city}</span>
            </p>
            <p>
              <span>Country:</span>
              <span>{address.country}</span>
            </p>
            <p>
              <span>State:</span>
              <span>{address.state}</span>
            </p>
            <p>
              <span>Street Address:</span>
              <span>{address.streetAddress}</span>
            </p>
            <p>
              <span>ZIP:</span>
              <span>{address.zipCode}</span>
            </p>
          </fieldset>
        </div>
      );
    }
  };

  render() {
    return (
      <div className="user-page">
        {this.creatingComponent()}
        <History />
        <h1>Friends:</h1>
        <Friends />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.userID,
  };
};

export default connect(mapStateToProps)(UserPage);
