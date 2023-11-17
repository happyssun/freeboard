// RegisterForm.tsx
import React from "react";
import { useForm } from "react-hook-form";

interface FormProps {
  onSubmit: (data: any) => void;
}

const RegisterForm: React.FC<FormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, errors, watch } = useForm();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 bg-white shadow-lg rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          ref={register({ required: true })}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">Username is required</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          ref={register({ required: true })}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">Password is required</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:shadow-outline"
          ref={register({
            required: true,
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
