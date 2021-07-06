export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}

export enum HealthCheckRating {
	"Healthy" = 0,
	"LowRisk" = 1,
	"HighRisk" = 2,
	"CriticalRisk" = 3
}

export interface DiagnosisEntry {
    code: string;
    name: string;
    latin?: string;
}

type SickLeave = { 
	startDate: string;
	endDate: string;
}

type Discharge = {
	date: string;
	criteria: string;
}

export type Entry = 
	| HealthCheckEntry
	| OccupationalHealthCareEntry
	| HospitalEntry;

interface BaseEntry {
	id: string;
	description: string;
	date: string;
	specialist: string;
	diagnosisCodes?: Array<DiagnosisEntry['code']>
}


interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthCareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital",
	discharge: Discharge;
}

export interface Patient {
	id: string;
	name: string;
	ssn: string;
	occupation: string;
	gender: Gender;
	dateOfBirth: string;
	entries: Entry[];
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientData = Omit<Patient, 'id' | 'entries'>;