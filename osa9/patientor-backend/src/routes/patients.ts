import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

// Get all patient non-sensitive data
router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientData());
});

// Get single patient data
router.get('/:id', (req, res) => {
	res.send(patientService.getPatientData(req.params.id));
})

// Add patient
router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error) {
        res.status(400).send(error.message);
    }
    // const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    // const addNewPatient = patientService.addPatient({
    //     name,
    //     dateOfBirth,
    //     ssn,
    //     gender,
    //     occupation
    // });
    // res.json(addNewPatient);
});

// Create an entry for a patient
router.post('/:id/entries', (req, res) => {
	const patient = patientService.getPatientData(req.params.id);
	if (patient) {
		try {
			const newEntry = toNewEntry(req.body);
			const updatedPatient = patientService.addNewEntry(patient, newEntry);
			console.log(updatedPatient)
			res.json(updatedPatient);
		} catch (error) {
			res.status(400).send(error.message);
		}
	} else {
		res.status(404).send({ error: "Patient does not exist" });
	}
});

export default router;