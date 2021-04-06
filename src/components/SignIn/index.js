import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emailSignInStart,
  googleSignInStart,
} from "./../../redux/User/user.actions";
import "./styles.scss";
import Button from "./../forms/Button";
import FormInput from "./../forms/FormInput";
import AuthWrapper from "./../AuthWrapper";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Passwort"
            handleChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>

          <div className="socialSignin">
            <div className="row">
              <Button onClick={handleGoogleSignIn}>Login mit Google</Button>
            </div>
          </div>

          <div className="links">
            <Link to="/recovery">Passwort zurücksetzen</Link>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignIn;
