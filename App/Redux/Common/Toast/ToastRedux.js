import {createActions} from 'reduxsauce';

const { Types, Creators } = createActions({
    showToast: ['message', 'toastType']
});
export const ToastTypes = Types;
export default Creators;
