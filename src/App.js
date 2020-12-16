import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navigation from "./components/Navbar.js";
import Head from "./components/Head.js";
import CourseList from "./components/TableofCourses.js";
import Stats from "./components/Stats.js";

import AddTutorial from "./AddCourse/add-course-component";
import Courses from "./Courses/Courses.js";
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CourseDetails from "./Courses/CourseDetails.js";


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#43a047',
    },
    secondary: {
      main: '#d50000',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <div className="App">
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Head />
            <Stats />
            <CourseList />
          </Route>
          <Route path="/Courses" component={Courses} />
          <Route path="/AddCourse" component={AddTutorial} />
          <Route path="/CourseDetails/" component={CourseDetails} />

        </Switch>


      </div>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
