import diagnosesData from '../../data/diagnoses.json';
import { DiagnosisEntry } from '../types';

const diagnoses: DiagnosisEntry[] = diagnosesData as DiagnosisEntry[];

const getDiagnoses = (): DiagnosisEntry[] => {
    return diagnoses;
};

const addDiagnosis = () => {
    return null;
};

export default {
    getDiagnoses,
    addDiagnosis
};