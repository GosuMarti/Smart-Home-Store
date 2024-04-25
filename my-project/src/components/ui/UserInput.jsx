import React from "react";

const UserInput = ({ type, placeholder, name, value, onChange }) => {
  return (
    <>
      <label className="input input-bordered flex items-center w-full max-w-xs my-1 rounded-xl bg-white border border-black hover:bg-neutral-100">
        <input
          className="text-gray-900 text-sm "
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};

export default UserInput;
