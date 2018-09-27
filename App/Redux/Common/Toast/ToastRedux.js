import {createActions} from 'reduxsauce';

const { Types, Creators } = createActions({
    showToast: ['message']
});
export const ToastTypes = Types;
export default Creators;
