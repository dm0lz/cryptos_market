import axios from "axios";
import history from "./../main/history";

export const registrations_form_submited_success = (data) => {
  return {
    type: "REGISTRATIONS_FORM_SUBMITED_SUCCESS",
    payload: data,
  };
};

export const registrations_error = (data) => {
  return {
    type: "REGISTRATIONS_ERROR",
    payload: data,
  };
};

export const registrations_retrieved_from_local_storage = (data) => {
  return {
    type: "REGISTRATIONS_RETRIEVED_FROM_LOCAL_STORAGE",
    payload: data,
  };
};

export const save_session_to_local_storage = (data) => {
  localStorage.setItem("jwt", data.jwt);
  localStorage.setItem("session", true);
  localStorage.setItem("email", data.email);
  localStorage.setItem("user", JSON.stringify(data));
};

export const reset_local_storage_session = () => {
  localStorage.setItem("jwt", "");
  localStorage.setItem("session", false);
  localStorage.setItem("email", "");
  localStorage.setItem("user", {});
  localStorage.clear();
};

export const do_reset_local_storage_session = () => {
  return (dispatch) => {
    reset_local_storage_session();
    window.location.href = "/";
  };
};

export const submit_form_registrations = (registrations) => {
  return (dispatch) => {
    axios
      .post("/api/v1/registrations", {
        email: registrations.email,
        password: registrations.password,
        password_confirmation: registrations.password_confirmation,
      })
      .then((response) => {
        dispatch(
          registrations_form_submited_success({
            registrations: response.data.data.sessions,
          })
        );
        // dispatch(registrations_error({errors: {message: ['You must confirm your email before signing in'], status: 401}}))
        // Clean form wait 2 seconds and redirect to sign_in
        setTimeout(() => {
          history.push("/sign_in");
        }, 4000);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          dispatch(registrations_error({ errors: error.response.data.error }));
          reset_local_storage_session();
        }
        console.log(error);
      });
  };
};

export const set_registrations_from_local_storage = () => {
  return (dispatch) => {
    if (localStorage.session === "true") {
      let data = {
        jwt: localStorage.jwt,
        session: localStorage.session,
        email: localStorage.email,
        user: JSON.parse(localStorage.user),
      };
      dispatch(registrations_retrieved_from_local_storage(data));
    }
  };
};
