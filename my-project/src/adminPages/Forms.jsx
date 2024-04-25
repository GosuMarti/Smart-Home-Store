import React from "react";
import { Form } from "react-bootstrap";
const Forms = ({ label, type, name, value, onChange }) => {
  return (
    <>
      <Form.Label className="font-semibold text-black mb-1 ">
        {label}
      </Form.Label>
      <Form.Control
        className="bg-white rounded-md py-2 border w-56 sm:w-96  hover:bg-neutral-200 text-black pl-2"
        type={type}
        name={name}
        onChange={onChange}
        value={type !== "file" ? value : undefined}
        required
      />
    </>
  );
};

export default Forms;
