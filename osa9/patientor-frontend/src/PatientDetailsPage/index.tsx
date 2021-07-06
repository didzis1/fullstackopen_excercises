import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { updatePatientList} from '../state/reducer';
import EntryDetails from './EntryDetails';

const PatientDetailsPage = () => {
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
			<p>ssn: {currentPatient.ssn}</p>
			<p>occupation: {currentPatient.occupation}</p>
			{ currentPatient?.entries?.length !== 0 ? <h2>entries</h2> : null }
			{ currentPatient?.entries?.map((entry) => {
				return (
					<EntryDetails key={entry.id} entry={entry}/>
				);
			})}
		</div>
	);
	
};

export default PatientDetailsPage;