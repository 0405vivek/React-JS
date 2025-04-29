import { Component } from "react";
import "./UserProfileCard.css";

class UserProfileCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="profile-card">
        <div className="avatar">
          <img src={this.props.image} alt="Profile" />
        </div>
        <h2>{this.props.name}</h2>
        <p className="location">{this.props.address}</p>
        <p className="bio">User interface designer and front-end developer</p>
        <p>{this.props.email}</p>
        <p>{this.props.phone}</p>
        <p>{this.props.gender}</p>
        <div className="buttons">
          <button className="btn btn-primary ">Message</button>
          <button className="btn outline">Following</button>
        </div>
        <div className="skills">
          <h4>SKILLS</h4>
          <div className="skill-tags">
            <span>Front End Development</span>
            <span>{this.props.skill1}</span>
            <span>{this.props.skill2}</span>
            <span>{this.props.skill3}</span>
            <span>{this.props.skill4}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfileCard;


