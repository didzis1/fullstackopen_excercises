import React from "react";
import { useStateValue } from "../state";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { TextField, DiagnosisSelection } from "../AddPatientModal/FormField";

interface Props {
	onSubmit: () => void;
	onClose: () => void;
}

const AddEntryForm = ({onSubmit, onClose}: Props) => {
	const [{ diagnosis }] = useStateValue();

	console.log(diagnosis);
	return (
		<Formik
		initialValues={{ 
			description: "",
			date: "",
			specialist: ""
		}}
			onSubmit={onSubmit}
			>
				{({isValid, dirty, setFieldValue, setFieldTouched}) => {
					return (
						<Form className="form ui">
							<Field 
								label="Description"
								placeholder="Description"
								name="description"
								component={TextField}
							/>

							<DiagnosisSelection 
								setFieldValue={setFieldValue}
								setFieldTouched={setFieldTouched}
								diagnoses={Object.values(diagnosis)}
							/>
							<Grid>
								<Grid.Column floated="left" width={5}>
								<Button type="button" onClick={onClose} color="red">
									Cancel
								</Button>
								</Grid.Column>
								<Grid.Column floated="right" width={5}>
								<Button
									type="submit"
									floated="right"
									color="green"
									disabled={!dirty || !isValid}
								>
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