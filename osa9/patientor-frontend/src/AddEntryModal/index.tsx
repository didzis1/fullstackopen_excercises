import React from 'react';
import AddEntryForm from './AddEntryForm';
import { Modal } from 'semantic-ui-react';
import { NewEntry } from '../types';

interface Props {
	modalOpen: boolean;
	onClose: () => void;
	onSubmit: (entryValues: NewEntry) => void;
	error?: string;
	patientId: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error, patientId }: Props) => {
	return (
		<Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
			<Modal.Header>Add a new entry</Modal.Header>
			<Modal.Content>
				{error && 'There is an error here for some reason...'}
				<AddEntryForm onSubmit={onSubmit} onClose={onClose} patientId={patientId} />
			</Modal.Content>
		</Modal>
	);
};


export default AddPatientModal;