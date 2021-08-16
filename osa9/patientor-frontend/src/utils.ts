import { EntryFormValues, NewEntry, BaseFormEntry, TypeOfEntry } from './types';

const assertNever = (value: never): never => {
	throw new Error(`Wrong entry type value: ${JSON.stringify(value)}`);
};

export const toNewEntryValues = (entryValues: EntryFormValues): NewEntry  => {
	const { type, description, date, specialist, diagnosisCodes } = entryValues;
	// Variable consisting of BaseEntry values
	const formBaseEntry: BaseFormEntry = {
		description,
		date,
		specialist,
		diagnosisCodes
	};
	// Check the entry type and return entry object
	switch(type) {
		case TypeOfEntry.Healthcheck:
			return {
				...formBaseEntry,
				type,
				healthCheckRating: entryValues.healthCheckRating
			};
		case TypeOfEntry.OccupationalHealthcare:
			return {
				...formBaseEntry,
				type,
				employerName: entryValues.employerName,
				sickLeave: {
					startDate: entryValues.sickLeaveStartDate,
					endDate: entryValues.sickLeaveEndDate
				}
			};
		case TypeOfEntry.Hospital:
			return {
				...formBaseEntry,
				type,
				discharge: {
					date: entryValues.dischargeDate,
					criteria: entryValues.dischargeText
				}
			};
		default:
			return assertNever(type);
	}
};

const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String;
};

export const dateIsValid = (date: unknown): boolean => {
	if (!isString(date) || !isDate(date)) {
		return false;
	}
	return true;
};