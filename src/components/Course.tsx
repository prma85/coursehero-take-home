import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Course as CourseInterface } from "../db";

interface CourseProps {
  course: CourseInterface;
}

const Course: React.FC<CourseProps> = ({ course }) => {
  const title = `${course.department} ${course.courseNumber}`;
  return (
    <Card className="course_card mb-3">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <Row>
            <Col xs="4" className="light">
              Department
            </Col>
            <Col xs="8">{course.department}</Col>
          </Row>
          <Row>
            <Col xs="4" className="light">
              Course
            </Col>
            <Col xs="8">{course.courseNumber}</Col>
          </Row>
          <Row>
            <Col xs="4" className="light">
              Year
            </Col>
            <Col xs="8">{course.year}</Col>
          </Row>
          <Row>
            <Col xs="4" className="light">
              Semester
            </Col>
            <Col xs="8">{course.semester}</Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Course;
