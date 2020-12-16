import React, { Component, useState, useEffect, useHistory } from 'react';
import { Table } from 'reactstrap';
import { Button } from 'react-bootstrap';
import { BrowserRouter, Route, Link,withRouter } from "react-router-dom";
import TutorialDataService from "../services/course.service.js";
import Icon from '@material-ui/core/Icon';
import Courses from "../Courses/Courses.js";
import { Update } from '@material-ui/icons';

export default class CourseList extends Component {


  constructor(props) {
    super(props);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);

    this.state = {
      courses: [],
      currentCourse: null,
      currentIndex: -1,
      allowed : false
    };
  }

  componentDidMount() {
    this.retrieveCourses();
  }

  // static get contextTypes()
  // {
  //   return{
  //     router: React.PropTypes.object.isRequired,
  //   };
  // }

  onRedirect(path)
  {
    if(this.state.allowed)
    {
      this.props.history.push(path);
    }
    
  }



  retrieveCourses() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          courses: response.data
        });
        console.log(response.data);
        this.setState({["allowed"]:true})
      })
      .catch(e => {
        console.log(e);
      });
  }



  refreshList() {
    this.retrieveCourses();
    this.setState({
      currentCourse: null,
      currentIndex: -1
    });
  }

  setActiveTutorial(courses, index) {
    this.setState({
      currentCourses: courses,
      currentIndex: index
    });
  }



  render() {
    const { courses, currentIndex } = this.state;


    return (
      <Table>
        <thead>
          <tr style={{ backgroundColor: "#E0E0E0" }}>
            <th colSpan="6" tooltip="Course List" style={{ textAlign: 'center' }}>
              Last 5 courses
            </th>
          </tr>
          <tr>
            <th> </th>
            <th tooltip="Title">Title</th>
            <th tooltip="Bookable">Bookable</th>
            <th tooltip="Price">Price</th>
            <th tooltip="Date">Date</th>
            <th tooltip="Actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses && courses.slice(Math.max(courses.length - 5, 0)).map((courses, index) => (

            <tr key={index} className={"tbody " + (index === currentIndex ? "active" : "")} onClick={() => this.setActiveTutorial(courses, index)}>
              <td><Icon color="primary">info</Icon></td>
              <td>{courses.title}</td>

              {/* -----BOOKABLE ICON----- */}

              <td><Icon color="secondary">{(courses.open ? "check" : "close")}</Icon></td>
              <td>{courses.price.normal}</td>
              <td>{courses.dates.start_date}</td>

              <td>
                    <div className="course">
                      <Button variant="primary" title="ViewDetails" className="view_details"><Link to={'/CourseDetails/' + courses.id} style={{ textDecoration: 'none', color: 'white' }}>View Details</Link></Button>
                    </div>
              </td>
            </tr>

          ))}
        </tbody>
        <tr style={{ backgroundColor: "#E0E0E0" }}>
          <th colSpan="6" style={{ textAlign: 'right' }}>
            
              
          <Button variant="primary">
    <Link  style={{ textDecoration: 'none', color: 'white' }} to='/Courses'>View All</Link>
</Button>

            
          </th>
        </tr>
      </Table>
    );
  }
}
