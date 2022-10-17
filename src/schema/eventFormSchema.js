import * as Yup from 'yup';

const eventBaseSchema = Yup.object().shape({
    eventName: Yup.string().min(2).required('Required'),
    summary: Yup.string().min(2).required('Required'),
    shortDescription: Yup.string().min(2).required('Required'),
    imageUrl: Yup.string().min(2).required('Required'),
    externalSiteUrl: Yup.string().min(2).required('Required'),
    isFree: Yup.boolean().required('Required'),
    dateStart: Yup.string().min(2).required('Required'),
    dateEnd: Yup.string().min(2).required('Required'),
    eventTypeId: Yup.number().required('Required'),
    eventStatusId: Yup.number().required('Required'),
});

const eventVenueSchema = Yup.object().shape({
    venueName: Yup.string().min(2).required('Required'),
    venueDescription: Yup.string().min(2).required('Required'),
    venueUrl: Yup.string().min(2).required('Required'),
});

export { eventBaseSchema, eventVenueSchema };
