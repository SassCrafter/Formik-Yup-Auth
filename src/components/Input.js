import React from "react";
import { Formik, useField } from "formik";
import FormLabel from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Alert from "react-bootstrap/Alert";

function Input({ label, ...restProps }) {
	const [field, meta] = useField(restProps);
	return (
		<>
			<FormLabel>{label}</FormLabel>
			{meta.touched && meta.error ? (
				<Alert variant="danger">{meta.error}</Alert>
			) : null}
			<FormControl {...field} {...restProps} />
		</>
	);
}

export default Input;
