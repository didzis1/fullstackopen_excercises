import React from 'react';
import { useStateValue } from '../state';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';
import {
	TextField,
	DiagnosisSelection,
	SelectField,
	SelectOptions,
	NumberField
} from '../AddPatientModal/FormField';
import { TypeOfEntry, NewEntry } from '../types';
import { dateIsValid, toNewEntryValues } from '../utils';
interface Props {
	onSubmit: (values: NewEntry) => void;
	onClose: () => void;
	patientId: string;
}

const AddEntryForm = ({ onSubmit, onClose, patientId }: Props) => {
	const [{ diagnosis }] = useStateValue();

	const entryOptions: SelectOptions[] = [
		{value: TypeOfEntry.Hospital, label: 'Hospital'},
		{value: TypeOfEntry.OccupationalHealthcare, label: 'Occupational Healthcare'},
		{value: TypeOfEntry.Healthcheck, label: 'Healthcheck'}
	];

	const extraFields = (typeOfEntry: TypeOfEntry) => {
		switch(typeOfEntry) {
			case TypeOfEntry.Hospital:
				return (
					<>
						<Field 
							label='Date of Discharge'
							placeholder='YYYY-MM-DD'
							name='dischargeDate'
							component={TextField}
						/>

						<Field 
							label='Discharge'
							placeholder='YYYY-MM-DD'
							name='dischargeText'
							component={TextField}
						/>

					</>
				);
			case TypeOfEntry.OccupationalHealthcare:
				return (
					<>
						<Field 
							label='Employer Name'
							placeholder='Employer Name'
							name='employerName'
							component={TextField}
						/>

						<Grid>
							<Grid.Column width={8}>
								<Field
									label='Sick leave start date'
									placeholder='YYYY-MM-DD'
									name='sickLeaveStartDate'
									component={TextField}
								/>
							</Grid.Column>
							<Grid.Column width={8}>
								<Field
								label='Sick leave end date'
								placeholder='YYYY-MM-DD'
								name='sickLeaveEndDate'
								component={TextField}
							/>
							</Grid.Column>
						</Grid>
					</>
				);
			case TypeOfEntry.Healthcheck:
				return (
					<Field
						label="Healthcheck Rating"
						name="healthCheckRating"
						component={NumberField}
						min={0}
						max={3}
					/>
				);
			default:
				return null;
		}
	};
	
	return (
		<Formik
			initialValues={{
				patientId,
				type: TypeOfEntry.Hospital,
				description: '',
				date: '',
				specialist: '',
				diagnosisCodes: [],
				// HealthCheck type
				healthCheckRating: 0,
				// OccupationalHealthCheck type
				employerName: '',
				sickLeaveStartDate: '',
				sickLeaveEndDate: '',
				// Hospital type
				dischargeDate: '',
				dischargeText: ''
			}}
			onSubmit={(values) => onSubmit(toNewEntryValues(values))}
			validate={values => {
				const requiredError = "Field is required";
				const invalidDateFormat = "Invalid date format";
				const errors: { [field: string]: string } = {};
				if (!values.description) {
					errors.description = requiredError;
				}
				if (!values.date) {
					errors.date = requiredError;
				} else if (!dateIsValid(values.date)) {
					errors.date = invalidDateFormat;

				}
				
				if (!values.specialist) {
					errors.specialist = requiredError;
				}
				
				if (values.type === TypeOfEntry.Healthcheck) {
					if (!values.healthCheckRating) {
						errors.healthCheckRating = requiredError;
					}
				}

				if (values.type === TypeOfEntry.OccupationalHealthcare) {
					if (!values.employerName) {
						errors.employerName = requiredError;
					}
					if (!values.sickLeaveStartDate) {
						errors.sickLeaveStartDate = requiredError;
					} else if (!dateIsValid(values.sickLeaveStartDate)) {
						errors.sickLeaveStartDate = invalidDateFormat;
					}

					if (!values.sickLeaveEndDate) {
						errors.sickLeaveEndDate = requiredError;
					} else if (!dateIsValid(values.sickLeaveEndDate)) {
						errors.sickLeaveEndDate = invalidDateFormat;
					}
				}

				if (values.type === TypeOfEntry.Hospital) {
					if (!values.dischargeDate) {
						errors.dischargeDate = requiredError;
					} else if (!dateIsValid(values.dischargeDate)) {
						errors.dischargeDate = invalidDateFormat;
					}
					if (!values.dischargeText) {
						errors.dischargeText = requiredError;
					}
				}
				
				return errors;

			}}>
			{({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
				return (
					<Form className='form ui'>

						<Field
							label='Description'
							placeholder='Description'
							name='description'
							component={TextField}
						/>

						<Field
							label='Date'
							placeholder='YYYY-MM-DD'
							name='date'
							component={TextField}
						/>

						<Field
							label='Specialist'
							placeholder='Specialist'
							name='specialist'
							component={TextField}
						/>

						<DiagnosisSelection
							setFieldValue={setFieldValue}
							setFieldTouched={setFieldTouched}
							diagnoses={Object.values(diagnosis)}
						/>

						<SelectField 
							label="Entry Type"
							name="type"
							options={entryOptions}
						/>
						
						{extraFields(values.type)}

						<Grid>
							<Grid.Column floated='left' width={5}>
								<Button
									type='button'
									onClick={onClose}
									color='red'>
									Cancel
								</Button>
							</Grid.Column>
							<Grid.Column floated='right' width={5}>
								<Button
									type='submit'
									floated='right'
									color='green'
									disabled={!dirty || !isValid}>
									Add
								</Button>
							</Grid.Column>
						</Grid>
					</Form>
				);
			}}
		</Formik>
	);
};

export default AddEntryForm;
