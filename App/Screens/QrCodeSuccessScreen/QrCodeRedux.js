import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    sendQrCodeRequest: ['qrCode'],
    sendQrCodeSuccess: ['isBound', 'walletAddress'],
    sendQrCodeFailure: ['error'],
    bindMachineRequest: ['walletAddress'],
    bindMachineSuccess: null,
    bindMachineFailure: ['error'],
    machineHasUsers: null
});

export const QrCodeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    loading: null,
    error: null,
    isBound: null,
    walletAddress: null,
    hasUsers: null
});

/* ------------- Selectors ------------- */
export const QrCodeSelectors = {
    selectError: state => state.qrCode.error,
    selectLoading: state => state.qrCode.loading,
    selectIsBound: state => state.qrCode.isBound === 1,
    selectWalletAddress: state => state.qrCode.walletAddress,
    selectMachineHasUsers: state => state.qrCode.hasUsers,
};

/* ------------- Reducers ------------- */
export const request = (state, action) => {
    return ({ ...state, loading: true, error: null})
};

export const success = (state, action) => {
    const {walletAddress, isBound} = action;
    return ({ ...state, loading: false, error: null, walletAddress, isBound})
};

export const failure = (state, action) =>
    ({ ...state, loading: false, error: action.error });


export const bindMachineRequest = (state, action) => {
    return ({ ...state, loading: true, error: null})
};

export const bindMachineSuccess = (state, action) => {
    return ({ ...state, loading: false, error: null, is_bind: action.isBound})
};

export const bindMachineFailure = (state, action) =>
    ({ ...state, loading: false, error: action.error, is_bind: false });

export const machineHasUsers = (state, action) =>
    ({ ...state, loading: false, error: action.error, hasUsers: true });


/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.SEND_QR_CODE_REQUEST]: request,
    [Types.SEND_QR_CODE_SUCCESS]: success,
    [Types.SEND_QR_CODE_FAILURE]: failure,
    [Types.BIND_MACHINE_REQUEST]: bindMachineRequest,
    [Types.BIND_MACHINE_SUCCESS]: bindMachineSuccess,
    [Types.BIND_MACHINE_FAILURE]: bindMachineFailure,
    [Types.MACHINE_HAS_USERS]: machineHasUsers
});
