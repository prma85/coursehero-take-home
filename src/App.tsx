import "./styles.scss";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Search from "./components/Search";
import CourseContainer from "./components/Course";
import { Course } from "./db";
import { getCourseFilters } from "./helpers/filters";

interface State {
  course: undefined | Course;
  error: boolean;
  errorMessage: string;
}

const initialState: State = {
  course: undefined,
  error: false,
  errorMessage: "Error: Could not parse course"
};

const App: React.FC = () => {
  const [state, setState] = useState<State>(initialState);

  // Get the value from the input and check for a result or set an error
  // Refactored later to add validation for when the string is valid but there is no courses
  const handleSearch = (val: string) => {
    // this helper will parse the string and get the filter/course
    // this will also check if there is error or not in the string
    const { error, filter } = getCourseFilters(val);

    setState((prevState) => ({
      ...prevState,
      error,
      course: filter as Course
    }));
  };

  return (
    <Container>
      <div className="App mt-4">
        <h1>
          <a
            title="Go to CourseHero homepage"
            href="http://coursehero.com"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="https://www.coursehero.com/assets/img/ch_blue_logo.svg"
              alt="CourseHero Logo"
            />
          </a>
        </h1>
        <h2>Start searching for your next course!</h2>
      </div>
      <Row className="justify-content-md-center">
        <Col md="6">
          <Search
            error={state.error}
            handleSearch={handleSearch}
            errorMessage={state.errorMessage}
          />
        </Col>
      </Row>
      {state.course && !state.error && (
        <Row className="justify-content-md-center">
          <Col md="6">
            <CourseContainer course={state.course} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default App;
