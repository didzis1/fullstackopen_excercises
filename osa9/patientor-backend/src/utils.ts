import { NewPatientData, Gender } from './types';


// Type guards for patient data fields
const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
    return ssn.length === 11 ? true : false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

// Field parsing
const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name: ' + name);
    }

    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect date or missing: ' + date);
    }

    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect SSN or missing');
    }
    
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect gender or missing: ' + gender);
    }

    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    
    return occupation;
};

type Fields = { 
    name: unknown, 
    dateOfBirth: unknown, 
    ssn: unknown, 
    gender: unknown, 
    occupation: unknown,
	entries: unknown
};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientData => {
    const newEntry: NewPatientData = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };

    return newEntry;
};

export default toNewPatientEntry;