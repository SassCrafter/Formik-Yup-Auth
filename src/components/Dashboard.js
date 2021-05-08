import React from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";

function Dashboard() {
	const { currentUser: user, logout } = useAuth();
	const history = useHistory();

	const logoutHandler = () => {
		logout().catch((error) => console.log(error.message));
	};
	return (
		<Card>
			<Card.Body>
				<h2 className="text-center mb-4">Dashboard</h2>
				<div>
					<img src={user.photoURL} alt={user.name} />
				</div>
				<p>
					<strong>Name: </strong>
					{user.name}
				</p>
				<p>
					<strong>Email: </strong>
					{user.email}
				</p>
				<p>
					<strong>Email Verified: </strong>
					{user.emailVerified ? "Yes" : "No"}
				</p>
				<div className="buttons">
					<Button>Update Profile</Button>
					<Button variant="warning" onClick={logoutHandler}>
						Log out
					</Button>
					<Button variant="danger">Delete Account</Button>
				</div>
			</Card.Body>
		</Card>
	);
}

export default Dashboard;
