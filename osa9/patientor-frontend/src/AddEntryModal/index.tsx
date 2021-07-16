import React from 'react';
import AddEntryForm from './AddEntryForm';
import { Modal } from 'semantic-ui-react';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: () => void;
	error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
	console.log(modalOpen, onClose, error, onSubmit);
	return (
		<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
			<Modal.Header>Add a new entry</Modal.Header>
			<Modal.Content>
				{error && 'There is an error here for some reason...'}
				<AddEntryForm onSubmit={onSubmit} onClose={onClose} />
			</Modal.Content>
		</Modal>
	);
};


export default AddPatientModal;