import * as Yup from 'yup';

const LocationValidationSchema = Yup.object().shape({
    locationTypeId: Yup.number().min(1, 'Must pick a location type').max(6).required('Required'),
    lineOne: Yup.string().min(2, 'Address 1 too short').max(255, 'Address 1 too long').required('Required'),
    lineTwo: Yup.string().min(2, 'Address 2 too short').max(255, 'Address 2 too long'),
    city: Yup.string().min(2, 'City too short').max(255, 'City too long').required('Required'),
    stateId: Yup.number().min(1, 'Must pick a location type').max(80).required('Required'),
    zip: Yup.string().min(5, 'Zip code too short').max(9, 'Zip code too long'),
});

export default LocationValidationSchema;
