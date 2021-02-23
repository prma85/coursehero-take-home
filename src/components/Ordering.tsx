import React from "react";
import { Form, Button, Col } from "react-bootstrap";

interface OrderingProps {
  handleChange: (val: string) => void;
}

// Got a little stuck here when using the react-bootstrap for the forms and validations
// I am used to use Ant Design, but since not everyone is familiar, I decided to use bootstrap
// This one is more common and it was also good to remember it (long time not using)

const Ordering: React.FC<OrderingProps> = ({ handleChange }) => {
  const onChange = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();
    handleChange(event.target.value);
  };
  return (
    <Form id="course_ordering" noValidate>
      <Form.Row>
        <Form.Group as={Col} xs="12" controlId="ordering">
          <Form.Label className="mb-0">Ordering</Form.Label>

          <Form.Control
            as="select"
            defaultValue="choose_one"
            onChange={onChange}
          >
            <option value="choose_one">Choose one for ordering...</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default Ordering;
