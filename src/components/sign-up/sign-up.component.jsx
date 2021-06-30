import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./sign-up.styles.scss";

class SignUp extends React.Component {
  constructor() {
    super();

    // intialize state to an object with empty values as our user data
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }
  // handleSubmit function to handle when the form is submitted
  handleSubmit = async (event) => {
    // prevents page from refreshing when the form is submitted
    event.preventDefault();

    // set our state equal to the values entered in the forms input fields
    const { displayName, email, password, confirmPassword } = this.state;

    // issue an alert to the user and break out of the function if the users password and confirmPassword do not match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // once the state is updated with the data from the form inputs, use the firebase method to create a new user given an email and password
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // add the new user to our firestore db
      await createUserProfileDocument(user, { displayName });

      // set our state back to an empty user object
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // we can convert our form inputs to controlled components by having React state conrtol how/when the form's input is updated.
  // this allows us to use React's state as the single source of truth.
  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={displayName}
            onChange={this.handleChange}
            label="Display Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            value={email}
            onChange={this.handleChange}
            label="Email"
            required
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={this.handleChange}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
