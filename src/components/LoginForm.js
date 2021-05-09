import React, { useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import Input from "./Input";
import { Formik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

function LoginForm() {
	const [error, setError] = useState("");
	const { login } = useAuth();
	const history = useHistory();
	return (
		<Formik
			initialValues={{
				email: "",
				password: "",
			}}
			validationSchema={Yup.object({
				email: Yup.string().email().required("Required"),
				password: Yup.string()
					.min(6, "Must be 6 characters or more")
					.max(16, "Must be 16 characters or less")
					.required("Required"),
			})}
			onSubmit={(value, action) => {
				console.log("login");
				login(value.email, value.password)
					.then(() => {
						setError("");
					})
					.catch((error) => setError(error.message));
				action.resetForm();
			}}
		>
			{({ dirty, isValid, isSubmiting, handleSubmit }) => (
				<>
					{error && <Alert variant="danger">{error}</Alert>}
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
								name="email"
								placeholder="email"
								label="email"
							/>
						</Form.Group>
						<Form.Group
							controlId="password"
							style={{ marginBottom: 10 }}
						>
							<Input
								type="password"
								name="password"
								placeholder="Password"
								label="Password"
							/>
						</Form.Group>
						<Button
							className="w-100"
							type="submit"
							disabled={!(isValid && dirty) || isSubmiting}
						>
							Log in
						</Button>
					</Form>
				</>
			)}
		</Formik>
	);
}

export default LoginForm;
