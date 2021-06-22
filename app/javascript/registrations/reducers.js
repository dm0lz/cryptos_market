
const initialState = {
  session: false,
  jwt: '',
  email: '',
  user: {},
  errors: {}
};

export default function RegistrationsReducer(state = initialState, action={}) {
  switch(action.type) {
    case 'REGISTRATIONS_FORM_SUBMITED_SUCCESS':
      return {
        ...state,
        jwt: action.payload.registrations.jwt,
        email: action.payload.registrations.email,
        user: action.payload.registrations,
        session: true,
        errors: {}
      }
    case 'REGISTRATIONS_ERROR':
      return {
        ...state,
        errors: action.payload.errors
      }
    case 'REGISTRATIONS_RETRIEVED_FROM_LOCAL_STORAGE':
      return {
        ...state,
        jwt: action.payload.jwt,
        session: action.payload.session,
        email: action.payload.email,
        user: action.payload.user
      }
    default:
      return state;
  }
}
