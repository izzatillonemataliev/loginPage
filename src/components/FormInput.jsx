import React from "react";

function FormInput({ label, type, name }) {
  return (
    <div>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type={type}
          name={name}
          placeholder={label}
          className="input input-bordered w-full max-w-xs"
        />
      </label>
    </div>
  );
}

export default FormInput;
