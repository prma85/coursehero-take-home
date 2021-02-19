import "./styles.scss";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import Search from "./components/Search";
import CourseContainer from "./components/Course";
import { Course, getCourseList } from "./db";
import { getCourseFilters } from "./helpers/filters";

interface State {
  data: Course[];
  searchResult: undefined | Course;
  error: boolean;
  errorMessage: string;
}

const initialState: State = {
  data: [],
  searchResult: undefined,
  error: false,
  errorMessage: "Error: Could not parse course"
};

const AppWithApi: React.FC = () => {
  // Defining which states I am using for the APP
  // isLoading and isLoaded is used to avoid unecessary renders for the app or multiple calls to the API
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, setState] = useState<State>(initialState);

  // Make the API call and update the state
  useEffect(() => {
    if (!isLoaded && !isLoading) {
      setIsLoading(true);
      getCourseList().then((data) => {
        setState((prevState) => ({
          ...prevState,
          data
        }));
        setIsLoaded(true);
        // This setTimeout is just to simulate an external API request and see the Spinner
        setTimeout(() => setIsLoading(false), 3000);
      });
    }
  }, [isLoading, isLoaded]);

  // Get the value from the input and check for a result or set an error
  // Refactored later to add validation for when the string is valid but there is no courses
  const handleSearch = (val: string) => {
    // this helper will parse the string and get the filter
    // this will also check if there is error or not in the string
    let { error, filter } = getCourseFilters(val);
    let searchResult: undefined | Course, errorMessage: string;

    errorMessage = "Error: Could not parse course";
    if (!error) {
      searchResult = state.data.find(
        (course) =>
          course.courseNumber === filter.courseNumber &&
          course.department === filter.department &&
          course.semester === filter.semester &&
          course.year === filter.year
      );
      if (!searchResult) {
        error = true;
        errorMessage = "Error: This course does not exist";
      }
    }
    setState((prevState) => ({
      ...prevState,
      error,
      searchResult,
      errorMessage
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
        <p>This seach will try to find your course on the Database</p>
      </div>
      {isLoading ? (
        <div className="home-spinner mt-5 mb-5">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
          Loading API Data
        </div>
      ) : (
        <Row className="justify-content-md-center">
          <Col md="6">
            <Search
              error={state.error}
              handleSearch={handleSearch}
              errorMessage={state.errorMessage}
            />
          </Col>
        </Row>
      )}

      {state.searchResult && (
        <Row className="justify-content-md-center">
          <Col md="6">
            <CourseContainer course={state.searchResult} />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default AppWithApi;
