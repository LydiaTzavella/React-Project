import React, { Component } from "react";
import TutorialDataService from "../services/course.service";
import InstructorsDataService from "../services/instructors.service.js";
import { Button } from "reactstrap";
import { Modal } from "react-bootstrap";
import { Checkbox } from "@material-ui/core";
import Icon from "@material-ui/core/Icon";

export default class CourseDetails extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeImagePath = this.onChangeImagePath.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeEarlyPrice = this.onChangeEarlyPrice.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeInstructor = this.onChangeInstructor.bind(this);
    this.onChangeOpen = this.onChangeOpen.bind(this);
    this.getTutorial = this.getTutorial.bind(this);
    this.updateTutorial = this.updateTutorial.bind(this);
    this.deleteTutorial = this.deleteTutorial.bind(this);

    this.state = {
      courses: [],
      currentCourse: {
        id: null,
        title: "",
        imagePath: "",
        price: { normal: "", early_bird: "" },
        dates: { start_date: "", end_date: "" },
        duration: "",
        open: false,
        instructors: [{ id: "" }],
        description: "",
        instructor: {
          id: null,
          gender: "",
          name: { first: "", last: "" },
          username: "",
          email: "",
          dob: "",
          bio: "",
          hobbies: [],
          linkedin: "",
        },
      },
      message: "",
    };
  }

  componentDidMount = () => {
    this.getTutorial(this.props.match.params.id);
    this.retrieveInstructors();
  };

  onChangeTitle = (e) => {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCourse: {
          ...prevState.currentCourse,
          title: title,
        },
      };
    });
  };

  onChangeDescription = (e) => {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        description: description,
      },
    }));
  };

  onChangeImagePath = (e) => {
    const imagePath = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        imagePath: imagePath,
      },
    }));
  };

  onChangeDuration = (e) => {
    const duration = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        duration: duration,
      },
    }));
  };

  onChangeOpen = (e) => {
    const open = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        open: open,
      },
    }));
  };

  onChangePrice = (e) => {
    const normal = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        price: { normal: normal },
      },
    }));
  };

  onChangeEarlyPrice = (e) => {
    const early_bird = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        price: { early_bird: early_bird },
      },
    }));
  };

  onChangeStartDate = (e) => {
    const start_date = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        start_date: start_date,
      },
    }));
  };

  onChangeEndDate = (e) => {
    const end_date = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        end_date: end_date,
      },
    }));
  };

  onChangeInstructor = (e) => {
    const instructors = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        instructors: instructors,
      },
    }));
  };

  getTutorial = (id) => {
    TutorialDataService.get(id)
      .then((response) => {
        this.setState({
          currentCourse: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  retrieveInstructors() {
    InstructorsDataService.getAll()
      .then((response) => {
        this.setState({
          instructor: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateTutorial = () => {
    TutorialDataService.update(
      this.state.currentCourse.id,
      this.state.currentCourse
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The course was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteTutorial = () => {
    TutorialDataService.delete(this.state.currentCourse.id)
      .then((response) => {
        console.log(response.data);
        this.props.history.push("/courses");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  state = {
    isOpen: false,
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  state = {
    Open: false,
  };

  open = () => this.setState({ Open: true });
  close = () => this.setState({ Open: false });

  render() {
    const { currentCourse, instructor } = this.state;

    return (
      //{currentCourse
      <div>
        <div style={{ marginLeft: "15px" }}>
          <h2 className="title">
            {currentCourse.title} ({currentCourse.id})
          </h2>
        </div>
        <div className="container-fluid" style={{ width: "100%" }}>
          <img
            src={currentCourse.imagePath}
            alt="img"
            style={{ width: "100%", height: "500px" }}
          ></img>
        </div>
        <hr />
        <div className="moneyduration">
          <div style={{ marginLeft: "15px" }}>
            <h4>Normal Price:{currentCourse.price.normal}</h4>
            <br />
            <h4>
              Bookable:
              <Icon color="secondary">
                {currentCourse.open ? "check" : "close"}
              </Icon>
            </h4>
          </div>
          <br />
          <div style={{ marginLeft: "15px" }}>
            <h4>Duration: {currentCourse.duration}</h4>
            <br />
            <h4>
              Dates: {currentCourse.dates.start_date} -{" "}
              {currentCourse.dates.end_date}
            </h4>
          </div>
        </div>

        <div
          dangerouslySetInnerHTML={{ __html: currentCourse.description }}
          className="container-fluid"
          style={{ marginTop: "70px", width: "100%", float: "rigth" }}
        ></div>

        <div className="buttons" style={{ marginLeft: "15px" }}>
          <Button
            type="submit"
            className="btn btn-info"
            onClick={this.openModal}
          >
            Edit
          </Button>

          <Button
            className="btn btn-danger"
            onClick={this.open}
            style={{ margin: "2px" }}
          >
            Delete
          </Button>
        </div>
        <hr />

        <div>
        <h2 style={{ marginLeft: "15px" }}>Instructors</h2>
          {instructor &&
            instructor.map((instructor, idx) => (
              <span key={idx}>
                
                
                {currentCourse.instructors.indexOf(instructor.id) !== -1 ?
                  <div>
               
                  <h6 style={{ marginLeft: "15px" }}>
                    Name: {instructor.name.first} {instructor.name.last}
                  </h6>
                  <br></br>

                  <h6 style={{ marginLeft: "15px" }}>Email:{instructor.email}</h6>
                  <br></br>

                  <h6 style={{ marginLeft: "15px" }}>Bio: {instructor.bio} </h6><br></br><br></br>
                </div>
                : ""}
              </span>
            ))}
        </div>

        <hr />

        <Modal show={this.state.isOpen} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {currentCourse.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="edit-form">
              <h4>Tutorial</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={currentCourse.title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="duration">Duration</label>
                  <input
                    variant="outlined"
                    type="text"
                    placeholder="Duration"
                    className="form-control"
                    id="description"
                    required
                    value={currentCourse.duration}
                    onChange={this.onChangeDuration}
                    name="description"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="imagePath">Image Path</label>
                  <input
                    variant="outlined"
                    type="text"
                    placeholder="Image Path"
                    className="form-control"
                    id="description"
                    required
                    value={currentCourse.imagePath}
                    onChange={this.onChangeImagePath}
                    name="description"
                  />
                </div>

                <div className="form-group">
                  <label>
                    Bookable
                    <Checkbox
                      variant="outlined"
                      name="open"
                      type="checkbox"
                      label="Bookable"
                      checked={currentCourse.open}
                      onChange={this.onChangeOpen}
                    />
                  </label>
                </div>
                <hr></hr>
                <h3>Instructors</h3>
                <div className="form-group">
                  <label>
                    <Checkbox
                      variant="outlined"
                      name="01"
                      value="02"
                      type="checkbox"
                      checked={currentCourse.instructors.id}
                      onChange={this.onChangeInstructor}
                    />
                    John Tsevdos
                  </label>
                  <br></br>
                  <label>
                    <Checkbox
                      variant="outlined"
                      name="02"
                      value="02"
                      type="checkbox"
                      checked={currentCourse.instructors.id}
                      onChange={this.onChangeInstructor}
                    />
                    Yiannis Nikolakopoulos
                  </label>
                </div>

                <hr></hr>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <br></br>
                  <textarea
                    variant="outlined"
                    style={{ width: "100%" }}
                    value={currentCourse.description}
                    onChange={this.onChangeDescription}
                    required
                  />
                </div>

                <hr></hr>

                <h3>Dates</h3>

                <div className="form-group">
                  <label htmlFor="start_date">Start Date</label>
                  <input
                    variant="outlined"
                    type="date"
                    placeholder="Start date"
                    className="form-control"
                    id="start_date"
                    required
                    value={currentCourse.dates.start_date}
                    onChange={this.onChangeStartDate}
                    name="start_date"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="end_date">End Date</label>
                  <input
                    variant="outlined"
                    type="date"
                    placeholder="End date"
                    className="form-control"
                    id="end_date"
                    required
                    value={currentCourse.dates.end_date}
                    onChange={this.onChangeEndDate}
                    name="end_date"
                  />
                </div>
                <hr></hr>

                <h3>Prices</h3>

                <div className="form-group">
                  <label htmlFor="early_bird">Early Bird</label>
                  <input
                    variant="outlined"
                    type="number"
                    className="form-control"
                    id="early_bird"
                    placeholder="0"
                    required
                    value={currentCourse.price.early_bird}
                    onChange={this.onChangeEarlyPrice}
                    name="early_bird"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="normal_price">Normal Price</label>
                  <input
                    variant="outlined"
                    type="number"
                    className="form-control"
                    id="normal"
                    placeholder="0"
                    required
                    value={currentCourse.price.normal}
                    onChange={this.onChangePrice}
                    name="normal"
                  />
                </div>
              </form>

              <p>{this.state.message}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-primary"
              variant="primary"
              style={{ backgroundColor: "blue" }}
              onClick={this.updateTutorial}
            >
              Save changes
            </Button>
            <Button variant="secondary" onClick={this.closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.Open} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Delete {currentCourse.title} </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you ure that you want to delete the course with Title{" "}
            {currentCourse.title} ?
          </Modal.Body>
          <Modal.Footer>
            <Button
              className="btn btn-primary"
              variant="primary"
              style={{ backgroundColor: "blue" }}
              onClick={this.deleteTutorial}
            >
              Yes
            </Button>
            <Button variant="secondary" onClick={this.close}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
