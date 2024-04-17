import React from "react";
import styled from "styled-components";
import { Form } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";

function Input({ placeholder, type, id, value, onChange }) {
  return (
    <Form.Group controlId="formBasicEmail">
      <TextField
        autoFocus
        margin="dense"
        id={id}
        label={placeholder}
        type={type}
        fullWidth
        value={value}
        onChange={onChange}
      />
      <Form.Text style={{ color: "red" }}></Form.Text>
    </Form.Group>
  );
}

export default Input;

const InputContainer = styled.div`
  border-radius: 20px;
  padding: 20px;

  > form {
    display: flex;
    justify-content: center;
  }

  > form > input {
    padding: 10px;
    width: 300px;
    border-radius: 10px;
    border: 1px solid gray;
  }
`;
