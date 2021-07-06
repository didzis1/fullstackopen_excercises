import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
	| {
		type: "UPDATE_PATIENT_LIST";
		payload: Patient;
	}
	| {
		type: "SET_DIAGNOSIS_LIST";
		payload: Diagnosis[];
	};

export const reducer = (state: State, action: Action): State => {
	switch (action.type) {
    case "SET_PATIENT_LIST":
		return {
        ...state,
        patients: {
			...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
			),
			...state.patients
        }
		};
	case "UPDATE_PATIENT_LIST":
		return {
			...state,
			patients: {
				...state.patients,
				[action.payload.id]: action.payload
			}
		};
    case "ADD_PATIENT":
		return {
        ...state,
        patients: {
			...state.patients,
			[action.payload.id]: action.payload
        }
		};
	case "SET_DIAGNOSIS_LIST":
		return {
			...state,
			diagnosis: {
				...action.payload.reduce(
				(memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
				{}
				),
				...state.diagnosis
			}
			};
		default:
		return state;
	}
};

export const setPatientList = (patientList: Patient[]) => {
	return {
		type: "SET_PATIENT_LIST" as const,
		payload: patientList
	};
};

export const updatePatientList = (patient: Patient) => {
	return {
		type: "UPDATE_PATIENT_LIST" as const,
		payload: patient
	};
};

export const addPatient = (patient: Patient) => {
	return {
		type: "ADD_PATIENT" as const,
		payload: patient
	};
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]) => {
	return {
		type: "SET_DIAGNOSIS_LIST" as const,
		payload: diagnosisList
	};
};