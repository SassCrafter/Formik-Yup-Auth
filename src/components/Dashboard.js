import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import Modal from "./Modal";
import DeleteUser from "./DeleteUser";

function Dashboard() {
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState({
		title: "",
		body: null,
		continueText: "Procced",
		continueHandler: () => {},
		continueBtnStyle: "primary",
	});
	const { currentUser: user, logout, deleteUser } = useAuth();
	const history = useHistory();

	const toggleModal = () => {
		setShowModal((prevState) => !prevState);
	};

	console.log(modalData);

	const logoutHandler = () => {
		// logout().catch((error) => console.log(error.message));
		setModalData({
			title: "Log out",
			body: <p>Are you sure to log out?</p>,
			continueText: "Log out",
			continueHandler: () => {
				toggleModal();
				logout().catch((error) => console.log(error.message));
			},
			continueBtnStyle: "primary",
		});
		toggleModal();
	};

	const deleteUserHandler = () => {
		setModalData({
			title: "Delete Account",
			body: <DeleteUser />,
			continueText: "Delete",
			continueHandler: () => {
				toggleModal();
				deleteUser().catch((error) => console.log(error.message));
			},
			continueBtnStyle: "danger",
		});
		toggleModal();
	};

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className="text-center mb-4">Dashboard</h2>
					<div>
						<img
							src={`/images/users/${user.photoURL}.png`}
							alt={user.name}
							className="w-25 mb-4 rounded img-fluid img-thumbnail"
							style={{ maxWidth: 80 }}
						/>
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
						<Button
							variant="warning"
							name="logout"
							onClick={logoutHandler}
						>
							Log out
						</Button>
						<Button variant="danger" onClick={deleteUserHandler}>
							Delete Account
						</Button>
					</div>
				</Card.Body>
			</Card>
			<Modal
				show={showModal}
				onContinue={modalData.continueHandler}
				onHideModal={toggleModal}
				title={modalData.title}
				body={modalData.body}
				continueText={modalData.continueText}
				continueBtnStyle={modalData.continueBtnStyle}
			/>
		</>
	);
}

export default Dashboard;
