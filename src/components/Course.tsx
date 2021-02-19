import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Course as CourseInterface } from "../db";

interface CourseProps {
  course: CourseInterface;
}

const Course: React.FC<CourseProps> = ({ course }) => {
  const title = `${course.department} ${course.courseNumber}`;
  return (
    <Card className="course_card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          <Row>
            <Col md="4" className="light">
              Department
            </Col>
            <Col md="8">{course.department}</Col>
          </Row>
          <Row>
            <Col md="4" className="light">
              Course
            </Col>
            <Col md="8">{course.courseNumber}</Col>
          </Row>
          <Row>
            <Col md="4" className="light">
              Year
            </Col>
            <Col md="8">{course.year}</Col>
          </Row>
          <Row>
            <Col md="4" className="light">
              Semester
            </Col>
            <Col md="8">{course.semester}</Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Course;
