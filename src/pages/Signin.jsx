import { useSignUp } from "../hooks/useSignUp";
import { FcGoogle } from "react-icons/fc";
import { Link, Form, useActionData } from "react-router-dom";

import FormInput from "../components/FormInput";
import { useEffect } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let name = formData.get("Name");
  let photo = formData.get("Photo");
  let email = formData.get("Email");
  let password = formData.get("Password");

  return { name, photo, email, password };
};

function Signup() {
  let userSignup = useActionData();

  const { signupWithGoogle, signupWithEmailAndPassword, user, error } =
    useSignUp();

  useEffect(() => {
    if (userSignup) {
      signupWithEmailAndPassword(
        userSignup.name,
        userSignup.photo,
        userSignup.email,
        userSignup.password
      );
    }
  }, [userSignup]);

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="max-w-96 w-full text-center">
        <h2 className="font-bold text-4xl mb-10">Signup</h2>
        <Form method="POST">
          <FormInput type="text" label="Name:" name="Name" />
          <FormInput type="url" label="PhotoUrl" name="Photo" />
          <FormInput type="email" label="Email:" name="Email" />
          <FormInput type="password" label="Password:" name="Password" />
          <div className="mt-8">
            <button className="btn btn-secondary w-full mb-3 " type="submit">
              Submit
            </button>
            <button
              type="button"
              onClick={signupWithGoogle}
              className="btn btn-secondary w-full mb-5 "
            >
              <FcGoogle className="text-3xl" />
              <span className="text-2xl">Google</span>
            </button>
            <p>
              <Link className="hover:text-violet-600 " to="/login">
                Are you already registered? Login
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
