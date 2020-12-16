import React, { Component } from 'react';
import { Button, Card, Container, Row } from 'react-bootstrap';
import TutorialDataService from "../services/course.service.js";
import Icon from '@material-ui/core/Icon';

export default class Courses extends Component {

  constructor(props) {
    super(props);
    this.retrieveCourses = this.retrieveCourses.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveTutorial = this.setActiveTutorial.bind(this);

    this.state = {
      courses: [],
      currentCourse: null,
      currentIndex: -1
    };
  }


  componentDidMount() {
    this.retrieveCourses();
  }


  retrieveCourses() {
    TutorialDataService.getAll()
      .then(response => {
        this.setState({
          courses: response.data
        });
        console.log(response.data);
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

    const { courses } = this.state;

    let styles = {
      margin: '5rem',
      marginTop: '20px',
      marginBottom: '20px',
      width: '18rem',


    };


    return (
      <Container fluid>
        <Row>

          {courses && courses.map((courses, index) => (
            <Card style={styles}>
              <Card.Title>{courses.title}</Card.Title>
              <Card.Img variant="top" src={courses.imagePath}></Card.Img>
              <Card.Body>

                <Card.Text>
                  <span>Price:{courses.price.normal} | Bookable: <Icon color="primary">check</Icon></span><br></br>
                  <span>Duration: {courses.duration}</span><br></br>
                  <span>Dates: {courses.dates.start_date} - {courses.dates.end_date}</span><br></br>
                </Card.Text>
                <Button variant="primary" style={{ textAlign: 'right' }}>View</Button>
              </Card.Body>
            </Card>

          ))}

        </Row>
      </Container>
    )
  }

}