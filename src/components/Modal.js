import React, { useState } from "react";
import { Modal as BsModal, Button } from "react-bootstrap";

function Modal({
	children,
	show,
	onContinue,
	onHideModal,
	title,
	body,
	continueText,
	continueBtnStyle,
}) {
	return (
		<BsModal show={show} onHide={onHideModal} centered>
			<BsModal.Header closeButton>
				<BsModal.Title>{title}</BsModal.Title>
			</BsModal.Header>
			<BsModal.Body>{children || body}</BsModal.Body>
			<BsModal.Footer>
				<Button variant="secondary" onClick={onHideModal}>
					Close
				</Button>
				<Button variant={continueBtnStyle} onClick={onContinue}>
					{continueText}
				</Button>
			</BsModal.Footer>
		</BsModal>
	);
}

export default Modal;
