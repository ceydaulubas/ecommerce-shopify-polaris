import React, { useContext, useState } from "react";
import { Form, TextField, Button, FormLayout, Page, Text } from "@shopify/polaris";
import { FirebaseFactory } from "../store/actions";
import { AuthContext } from "../store/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (field: string, value: string) => {
    setValues({ ...values, [field]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const firebaseAction = FirebaseFactory();
      await firebaseAction.signUp(values);
      setLoading(false);
      setUser({ ...values });
      console.log({ ...values });
      alert("You sign up correctly!");
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  return (
    <Page>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          <TextField label="Username" value={values.username} onChange={(value) => handleChange("username", value)} autoComplete="off" />
          <TextField type="email" label="Email" value={values.email} onChange={(value) => handleChange("email", value)} autoComplete="off" />
          <TextField type="password" label="Password" value={values.password} onChange={(value) => handleChange("password", value)} autoComplete="off" />
          <TextField label="Phone Number" value={values.phoneNumber} onChange={(value) => handleChange("phoneNumber", value)} autoComplete="off" />
          <Button primary submit loading={loading}>
            Sign Up
          </Button>
        </FormLayout>
      </Form>
      <Text variant="headingSm" as="h5">
        Already have an account?{" "}
        <Link to="/login" className="site-btn">
          {" "}
          Log In
        </Link>
      </Text>
    </Page>
  );
};

export default SignUpPage;
