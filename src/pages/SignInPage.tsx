import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Form, FormLayout, TextField, Button, Text } from "@shopify/polaris";
import { Link } from "react-router-dom";
import { AuthContext } from "../store/firebase";
import { FirebaseFactory } from "../store/actions";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setValues({ ...values, [field]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const firebaseAction = FirebaseFactory();
      await firebaseAction.signIn(values);
      setLoading(false);
      setUser({ ...values });
      setIsLoggedIn(true);
      alert("You sign up correctly!");
      navigate("/");
      console.log({ ...values });
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
          <TextField label="Email" value={values.email} onChange={(value) => handleChange("email", value)} autoComplete="off" />
          <TextField type="password" label="Password" value={values.password} onChange={(value) => handleChange("password", value)} autoComplete="off" />
          <Button primary submit loading={loading}>
            Login
          </Button>
        </FormLayout>
      </Form>
      <Text variant="headingSm" as="h5">
        Don't have an account?{" "}
        <Link to="/register" className="site-btn">
          {" "}
          Register
        </Link>
      </Text>
    </Page>
  );
};

export default SignInPage;
