import React from "react";
import { Form, Button, Col } from "react-bootstrap";

interface ResetProps {
  handleReset: () => void;
  isEnabled: boolean;
}

// Got a little stuck here when using the react-bootstrap for the forms and validations
// I am used to use Ant Design, but since not everyone is familiar, I decided to use bootstrap
// This one is more common and it was also good to remember it (long time not using)

const ResetBtn: React.FC<ResetProps> = ({ handleReset, isEnabled }) => {
  const onClick = (event: React.MouseEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();
    handleReset();
  };
  return (
    <Form id="course_reset" noValidate>
      <Form.Row>
        <Form.Group as={Col} xs="12" controlId="validationSearch">
          <Button
            style={{ width: "100%" }}
            type="submit"
            className="mt-4"
            onClick={onClick}
            disabled={!isEnabled}
          >
            Clean course list
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default ResetBtn;
