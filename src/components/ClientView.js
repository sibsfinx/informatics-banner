import React, { Component } from 'react'
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import _ from 'lodash';

const waGroups = [
  {
    name: 'Nutrition One',
    url: 'https://chat.whatsapp.com/5fW5iMbMgN56iDuoahzhnv'
  },
  {
    name: 'Fitness One',
    url: 'https://chat.whatsapp.com/5fW5iMbMgN56iDuoahzhnv'
  }
];

class ClientView extends Component {
  getClient() {
    let client = _.find(this.props.clients, {id: this.props.match.params.clientId});
    return client;
  }


  render() {
    return (
      <div>
        <div className="container">
          <div className="content-block">
            <Link to="/clients" className="btn btn-default">
              &lt; Back
            </Link>
          </div>
          <div className="client-view">
            <h1 className="content-block">
              {this.getClient().name}
            </h1>
            <div className="content-block">
              <h3>Whatsapp groups</h3>
              { waGroups.map((g, i) => {
                return (
                  <p>
                    <a href={g.url} target="_blank">
                      {g.name}
                    </a>
                  </p>
                )
              }) }
            </div>
            <h3 className="content-block">
              Profile
            </h3>
            <div className="attributes_table user" id="attributes_table_user_176">
              <table className="table" border="0" cellspacing="0" cellpadding="0">
                <tbody><tr className="row row-email">
                  <th>Email</th>
                  <td>{this.getClient().email}</td>
                </tr>
                <tr className="row row-first_name">
                  <th>Name</th>
                  <td>{this.getClient().name}</td>
                </tr>
                <tr className="row row-phone">
                  <th>Phone</th>
                  <td>07972172379</td>
                </tr>
              </tbody></table>
              <div className="attributes_table profile" id="attributes_table_profile_198">
                <table className="table" border="0" cellspacing="0" cellpadding="0">
                  <tbody><tr className="row row-gender">
                    <th>Gender</th>
                    <td>male</td>
                  </tr>
                  <tr className="row row-birth_date">
                    <th>Birth Date</th>
                    <td>January 13, 1980</td>
                  </tr>
                  <tr className="row row-agree_to_exclusive_events">
                    <th>Agree To Exclusive Events</th>
                    <td>
                      <span className="status_tag yes">Yes</span>
                    </td>
                  </tr>
                  <tr className="row row-agree_to_nth_terms_and_conditions">
                    <th>Agree To Nth Terms And Conditions</th>
                    <td>2</td>
                  </tr>
                  <tr className="row row-nutrition_fitness_goals">
                    <th>Nutrition Fitness Goals</th>
                    <td>["build_muscle"]</td>
                  </tr>
                  <tr className="row row-nutrition_fitness_goal_text">
                    <th>Nutrition Fitness Goal Text</th>
                    <td>
                      <span className="empty">Empty</span>
                    </td>
                  </tr>
                  <tr className="row row-fitness_event_description">
                    <th>Fitness Event Description</th>
                    <td>
                      <span className="empty">Empty</span>
                    </td>
                  </tr>
                  <tr className="row row-fitness_injury_recover_description">
                    <th>Fitness Injury Recover Description</th>
                    <td>
                      <span className="empty">Empty</span>
                    </td>
                  </tr>
                  <tr className="row row-fitness_specific_condition_description">
                    <th>Fitness Specific Condition Description</th>
                    <td>
                      <span className="empty">Empty</span>
                    </td>
                  </tr>
                  <tr className="row row-wellbeing_goals">
                    <th>Wellbeing Goals</th>
                    <td>["reduce_stress"]</td>
                  </tr>
                  <tr className="row row-wellbeing_goal_text">
                    <th>Wellbeing Goal Text</th>
                    <td>
                      <span className="empty">Empty</span>
                    </td>
                  </tr>
                </tbody></table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default ClientView;
