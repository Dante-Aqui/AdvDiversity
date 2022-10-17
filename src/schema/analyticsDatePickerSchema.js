import * as Yup from 'yup';

const analyticsDatePickerSchema = Yup.object().shape({
    startDate: Yup.date().max(new Date(), "Cannot input a date that surpasses current date.").required(),
    endDate: Yup.date()
                .when("startDate", (startDate, Yup) => startDate && Yup.min(startDate, "End date must be after start date."))
                .max(new Date(), "Cannot input a date that surpasses current date.").required()
});

export default analyticsDatePickerSchema;