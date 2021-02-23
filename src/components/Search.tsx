import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";

interface SearchProps {
  handleSearch: (val: string) => void;
  error: boolean;
  errorMessage: string;
}

// Got a little stuck here when using the react-bootstrap for the forms and validations
// I am used to use Ant Design, but since not everyone is familiar, I decided to use bootstrap
// This one is more common and it was also good to remember it (long time not using)

const Search: React.FC<SearchProps> = ({
  handleSearch,
  error,
  errorMessage
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const isEnabled = searchValue.length > 0;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleSearch(searchValue);
  };
  return (
    <Form id="course_search" noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} xs="9" controlId="validationSearch">
          <Form.Label className="mb-0">Course</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Course"
            required
            isInvalid={!!error}
            onChange={(val) => setSearchValue(val.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            {errorMessage}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} xs="3" controlId="searchSubmit">
          <Button
            style={{ width: "100%" }}
            type="submit"
            className="mt-4"
            disabled={!isEnabled}
          >
            Submit
          </Button>
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default Search;
