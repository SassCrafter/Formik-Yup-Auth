import React from "react";
import { Route, Redirect } from "react-router-dom";

export const IsUserRedirect = ({
	user,
	loggedInPath,
	children,
	...restProps
}) => {
	return (
		<Route
			{...restProps}
			render={() => {
				if (!user) {
					return children;
				}
				if (user) {
					return <Redirect to={{ pathname: loggedInPath }} />;
				}
				return null;
			}}
		/>
	);
};

export function ProtectedRoute({ user, children, ...restProps }) {
	return (
		<Route
			{...restProps}
			render={({ location }) => {
				if (user) {
					return children;
				}

				if (!user) {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: { from: location },
							}}
						/>
					);
				}
				return null;
			}}
		/>
	);
}
