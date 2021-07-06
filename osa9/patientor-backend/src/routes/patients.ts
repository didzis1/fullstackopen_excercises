import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatientData());
});

router.get('/:id', (req, res) => {
	res.send(patientService.getPatientData(req.params.id));
})

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

export default router;