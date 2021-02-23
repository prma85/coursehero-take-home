import "./styles.scss";
import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Search from "./components/Search";
import CourseContainer from "./components/Course";
import { Course } from "./db";
import { getCourseFilters } from "./helpers/filters";
import Ordering from "./components/Ordering";
import ResetBtn from "./components/Reset";

interface State {
  courses: Course[];
  error: boolean;
  errorMessage: string;
}

const initialState: State = {
  courses: [] as Course[],
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

    setState((prevState) => {
      const searchResult =
        !error &&
        prevState.courses?.find(
          (course) =>
            course.courseNumber === filter.courseNumber &&
            course.department === filter.department &&
            course.semester === filter.semester &&
            course.year === filter.year
        );

      if (searchResult) {
        return {
          ...prevState,
          error: true,
          errorMessage: "This course is already in the list! Try a new one"
        };
      }

      const { courses } = prevState;
      if (!error) courses.push(filter as Course);

      return {
        ...prevState,
        error,
        courses
      };
    });
  };

  const handleChange = (val: string) => {
    if (val !== "choose_one") {
      setState((prevState) => {
        const { courses } = prevState;
        const order = val === "asc" ? 1 : -1;
        courses.sort((a, b) => {
          if (a.year > b.year) return order;
          if (a.year < b.year) return order * -1;
          return 0;
        });
        return {
          ...prevState,
          courses
        };
      });
    }
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
      <Row className="justify-content-md-center">
        <Col md="6">
          <Ordering handleChange={handleChange} />
        </Col>
      </Row>
      {state.courses.length > 0 &&
        state.courses.map((course) => (
          <Row className="justify-content-md-center">
            <Col md="6">
              <CourseContainer course={course} />
            </Col>
          </Row>
        ))}

      <Row className="justify-content-md-center">
        <Col md="3">
          <ResetBtn
            isEnabled={state.courses.length > 0}
            handleReset={() => setState(initialState)}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
