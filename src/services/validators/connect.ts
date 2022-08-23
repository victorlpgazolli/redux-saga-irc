import * as yup from 'yup';

const schema = yup.object().shape({
    host: yup.string().required("payload.host is required"),
    port: yup.number().required("payload.port must be a number").positive().integer(),
    nick: yup.string(),
    username: yup.string().required("payload.username is required"),
});

const validate = (payload: any) => schema.validateSync(payload)

export default validate