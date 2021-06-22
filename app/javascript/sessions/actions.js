import axios from 'axios'
import history from './../main/history'

export const sessions_form_submited_success = (data) => {
  return {
    type: 'SESSIONS_FORM_SUBMITED_SUCCESS',
    payload: data
  }
}

export const sessions_error = (data) => {
  return {
    type: 'SESSIONS_ERROR',
    payload: data
  }
}

export const sessions_retrieved_from_local_storage = (data) => {
  return {
    type: 'SESSIONS_RETRIEVED_FROM_LOCAL_STORAGE',
    payload: data
  }
}
export const chart_type_selected = (chart_type) => {
  return {
    type: 'CHART_TYPE_SELECTED',
    payload: chart_type
  }
}

export const save_session_to_local_storage = (data) => {
  localStorage.setItem('jwt', data.jwt)
  localStorage.setItem('session', true)
  localStorage.setItem('email', data.email)
  localStorage.setItem('user', JSON.stringify(data))
}

export const reset_local_storage_session = () => {
  localStorage.setItem('jwt', '')
  localStorage.setItem('session', false)
  localStorage.setItem('email', '')
  localStorage.setItem('user', {})
  localStorage.clear()
}

export const do_reset_local_storage_session = () => {
  return (dispatch) => {
    reset_local_storage_session()
    window.location.href = '/'
  }
}


export const set_selected_chart_type = (chart_type) => {
  return (dispatch) => {
    dispatch(chart_type_selected(chart_type))
  }
}

export const submit_form_sessions = (sessions) => {
  return (dispatch) => {
    axios.post('/api/v1/sessions', {email: sessions.email, password: sessions.password})
      .then((response) => {
        dispatch(sessions_form_submited_success({sessions: response.data.data.sessions}))
        save_session_to_local_storage(response.data.data.sessions)
        history.push('/')
      })
      .catch((error) => {
        if(error.response.status === 401){
          dispatch(sessions_error({errors: error.response.data.error}))
          reset_local_storage_session()
          // setTimeout(() => {
          //   window.location = '/sign_in'
          // }, 1500)
        }
        console.log(error)
      })
  }
}

export const set_sessions_from_local_storage = () => {
  return (dispatch) => {
    if(localStorage.session === "true"){
      let data = {
        jwt: localStorage.jwt,
        session: localStorage.session,
        email: localStorage.email,
        user: JSON.parse(localStorage.user)
      }
      dispatch(sessions_retrieved_from_local_storage(data))
    }
  }
}
