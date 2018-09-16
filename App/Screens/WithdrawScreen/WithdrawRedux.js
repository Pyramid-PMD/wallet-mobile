import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
    sendWithdrawRequest: ['withdrawal'],
    sendWithdrawSuccess: null,
    sendWithdrawFailure: ['error'],
    getSavedAddressList: null,
    getSavedAddressListSuccess: ['addressList']
});

export const WithdrawTypes = Types;
export default Creators;


const INITIAL_STATE = {
    loading: null,
    error: null,
    addressList: null
};

export const WithdrawSelectors = {
    selectAddressList: (state) => state.withdraw.addressList || []
};

export const request = (state) => ({...state, loading: true, error: null });
export const success = (state, action) => ({...state, loading: false, error: null });
export const failure = (state, action) => ({...state, loading: false, error: action.error });
export const getSavedAddressListSuccess = (state, action) => ({...state, addressList: action.addressList });


export const reducer = createReducer(INITIAL_STATE, {
    [Types.SEND_WITHDRAW_REQUEST]: request,
    [Types.SEND_WITHDRAW_SUCCESS]: success,
    [Types.SEND_WITHDRAW_FAILURE]: failure,
    [Types.GET_SAVED_ADDRESS_LIST_SUCCESS]: getSavedAddressListSuccess
});