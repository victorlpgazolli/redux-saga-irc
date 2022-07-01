import yup from 'yup';

const schema = yup.object().shape({
    host: yup.string().required("payload.host is required"),
    channel: yup.string().required("payload.channel is required"),
});

const validate = (payload: any) => schema.validateSync(payload)

export default validate