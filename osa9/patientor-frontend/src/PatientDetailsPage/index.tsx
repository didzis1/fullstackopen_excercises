import React, { useState } from "react";
import axios from "axios";
import { Button, Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { updatePatientList} from '../state/reducer';
import EntryDetails from './EntryDetails';
import AddEntryModal from "../AddEntryModal";

const PatientDetailsPage = () => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const { id } = useParams<{ id: string }>();
	const [{ patients }, dispatch] = useStateValue();
	
	const currentPatient = patients[id.toString()];
	const getPatient = async () => {
		const { data: patientData} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
		return patientData;
	};
	if (!currentPatient) {
		return <p>Loading data...</p>;
	}
	if (!currentPatient || !currentPatient.ssn) {
		try {
			getPatient()
				.then(response => {
					dispatch(updatePatientList(response));
				})
				.catch(error => console.log(error));
		} catch (error) {
			console.log(error);
		}
	}

	const openModal = (): void => {
		setModalOpen(true);
	};

	const closeModal = (): void => {
		setModalOpen(false);
		setError(undefined);
	};


	const getGenderIcon = (gender: string) => {
		switch (gender) {
			case 'male':
				return <i className="mars icon"></i>;
			case 'female':
				return <i className="venus icon"></i>;
			case 'other':
				return <i className="genderless icon"></i>;
			default:
				return <i></i>;
		}
	};


	return (
		<div>
			<h1>{currentPatient.name} {getGenderIcon(currentPatient.gender)}</h1>
			<AddEntryModal 
				modalOpen={modalOpen}
				onSubmit={() => console.log('hello')}
				error={error}
				onClose={closeModal}
			/>
			<Button onClick={() => openModal()}>Add New Entry</Button>
			<Container textAlign="left">
			<p>ssn: {currentPatient.ssn}</p>
			<p>occupation: {currentPatient.occupation}</p>
			{ currentPatient?.entries?.length !== 0 ? <h2>entries</h2> : null }
			{ currentPatient?.entries?.map((entry) => {
				return (
					<EntryDetails key={entry.id} entry={entry}/>
				);
			})}
			</Container>

		</div>
	);
	
};

export default PatientDetailsPage;