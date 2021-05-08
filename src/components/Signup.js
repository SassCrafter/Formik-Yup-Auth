import React, { useState } from "react";
import Input from "./Input";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { useAuth } from "../context/AuthContext";
import * as Yup from "yup";
import { Link, useHistory } from "react-router-dom";

function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
	const { signup } = useAuth();
	const history = useHistory();

	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
				confirmPassword: "",
			}}
			validationSchema={Yup.object({
				email: Yup.string()
					.email("Invalid email address")
					.required("Required"),
				password: Yup.string()
					.min(6, "Must be 6 characters or more")
					.max(16, "Must be 16 characters or less")
					.required("Required"),
				confirmPassword: Yup.string()
					.oneOf([Yup.ref("password")], "Passwords must match")
					.required("Passwords must match"),
			})}
			onSubmit={(values, actions) => {
				console.log(actions);
				// setIsLoading(true);
				actions.resetForm();
				signup(values.email, values.password)
					.then(() => {
						setIsLoading(false);
						history.push("/dashboard");
					})
					.catch((error) => setError(error.message));
				console.log(JSON.stringify(values));
			}}
		>
			{({ isSubmiting, dirty, isValid, handleSubmit }) => {
				return (
					<Card>
						<Card.Body>
							<h2 className="text-center mb-4">Sign up</h2>
							<Form
								onSubmit={(e) => {
									e.preventDefault();
									handleSubmit(e);
								}}
							>
								<Form.Group
									controlId="email"
									style={{ marginBottom: 10 }}
								>
									<Input
										type="email"
										label="Email"
										name="email"
										placeholder="Email"
									/>
								</Form.Group>
								<Form.Group
									controlId="password"
									style={{ marginBottom: 10 }}
								>
									<Input
										type="password"
										label="Password"
										name="password"
										placeholder="Password"
									/>
								</Form.Group>
								<Form.Group
									controlId="confirmPassword"
									style={{ marginBottom: 10 }}
								>
									<Input
										type="password"
										label="Confirm Password"
										name="confirmPassword"
										placeholder="Confirm Password"
									/>
								</Form.Group>
								<Button
									disabled={
										!(isValid && dirty) || isSubmiting
									}
									type="submit"
									className="w-100"
								>
									Sign up
								</Button>
							</Form>
							<div className="mt-3">
								Have an account already?{" "}
								<Link to="/login">Log in</Link>
							</div>
						</Card.Body>
					</Card>
				);
			}}
		</Formik>
	);
}

export default Login;
