import patients from '../../data/patients';
import { PublicPatient, NewPatientData, Patient, NewEntryData, Entry } from '../types';
import {v1 as uuid} from 'uuid';


const getNonSensitivePatientData = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getPatientData = (id: string): Patient | undefined => {
	const patientData = patients.find(patient => patient.id === id);
	return patientData;
}

const getAllPatientData = () => {
    return patients;
};

const addPatient = ( entry: NewPatientData ): Patient => {
    const id = uuid();
    const newPatientEntry = {
        id,
        ...entry,
		entries: []
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

const addNewEntry = (patient: Patient, entryData: NewEntryData): Patient => {
	// New entry, must be returned as Entry type

	const newEntry: Entry = {
		...entryData,
		id: uuid()
	}

	patient.entries.push(newEntry);

	return patient;
}


export default {
    getNonSensitivePatientData,
    getAllPatientData,
    addPatient,
	getPatientData,
	addNewEntry
};