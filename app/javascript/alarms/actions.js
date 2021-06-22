import axios from 'axios'


export const show_create_alarm_modal = (bool) => {
  return {
    type: 'SHOW_CREATE_ALARM_MODAL',
    payload: bool
  }
}
export const show_edit_alarm_modal = (bool) => {
  return {
    type: 'SHOW_EDIT_ALARM_MODAL',
    payload: bool
  }
}

export const alarm_selected = (alarm) => {
  return {
    type: 'ALARM_SELECTED',
    payload: alarm
  }
}

export const user_alarms_fetched = (alarms) => {
  return {
    type: 'USER_ALARMS_FETCHED',
    payload: alarms
  }
}
export const alarm_created = (alarm) => {
  return {
    type: 'ALARM_CREATED',
    payload: alarm
  }
}
export const add_alarm_error = (error) => {
  return {
    type: 'CREATE_ALARM_ERROR',
    payload: error
  }
}
export const toggled_alarm = (alarm) => {
  return {
    type: 'TOGGLED_ALARM',
    payload: alarm
  }
}
export const set_toggle_alarm_error = (errors) => {
  return {
    type: 'TOGGLE_ALARM_ERROR',
    payload: errors
  }
}



export const destroyed_alarm = (alarm) => {
  return {
    type: 'DESTROYED_ALARM',
    payload: alarm
  }
}

export const edited_alarm = (alarm) => {
  return {
    type: 'EDITED_ALARM',
    payload: alarm
  }
}

export const assets_infos_fetched = (assets_infos) => {
  return {
    type: 'ASSETS_INFOS_FETCHED',
    payload: assets_infos
  }
}

export const alarms_loading_set = (bool) => {
  return {
    type: 'ALARMS_LOADING_SET',
    payload: bool
  }
}



export const set_selected_alarm = (alarm) => {
  return (dispatch) => {
    dispatch(alarm_selected(alarm))
  }
}

export const set_show_create_alarm_modal = (bool) => {
  return (dispatch) => {
    dispatch(show_create_alarm_modal(bool))
  }
}

export const set_show_edit_alarm_modal = (bool) => {
  return (dispatch) => {
    dispatch(show_edit_alarm_modal(bool))
  }
}

export const fetch_user_alarms = (jwt_token) => {
  return (dispatch) => {
    dispatch(alarms_loading_set(true))
    axios.get('/api/v1/private/alarms', {headers: {Authorization: jwt_token, responseType: 'json'}})
      .then((response) => {
        dispatch(user_alarms_fetched({alarms: response.data.data.alarms}))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}


export const post_create_alarm = (payload) => {
  return (dispatch) => {
    axios.post('/api/v1/private/alarms', payload, {headers: {Authorization: localStorage.jwt, responseType: 'json'}})
      .then((response) => {
        //console.log(response.data)
        dispatch(alarm_created(response.data))
        dispatch(show_create_alarm_modal(false))
      })
      .catch((error) => {
        if(error.response.status === 422){
          dispatch(add_alarm_error({errors: error.response.data.error}))
          //reset_local_storage_session()
        }
        console.log(error)
      })
  }
}

export const toggle_alarm_activation = (payload) => {
  return (dispatch) => {
    axios.patch('/api/v1/private/alarms/toggle_activation', {symbol: payload}, {headers: {Authorization: localStorage.jwt, responseType: 'json'}})
      .then((response) => {
        //console.log(response.data)
        dispatch(toggled_alarm(response.data))
      })
      .catch((error) => {
        if(error.response.status === 422){
          dispatch(set_toggle_alarm_error({errors: error.response.data.error}))
          //reset_local_storage_session()
        }
        console.log(error)
      })
  }
}

export const destroy_alarm = (payload) => {
  return (dispatch) => {
    axios.patch('/api/v1/private/alarms/destroy_alarm', {symbol: payload}, {headers: {Authorization: localStorage.jwt, responseType: 'json'}})
      .then((response) => {
        //console.log(response.data)
        dispatch(destroyed_alarm({asset_symbol: payload}))
      })
      .catch((error) => {
        if(error.response.status === 422){
          //dispatch(add_asset_error({errors: error.response.data.error}))
          //reset_local_storage_session()
        }
        console.log(error)
      })
  }
}

export const patch_edit_alarm = (payload) => {
  return (dispatch) => {
    axios.patch('/api/v1/private/alarms/edit_alarm', {symbol: payload}, {headers: {Authorization: localStorage.jwt, responseType: 'json'}})
      .then((response) => {
        //console.log(response.data)
        dispatch(edited_alarm(response.data))
        dispatch(show_edit_alarm_modal(false))
      })
      .catch((error) => {
        if(error.response.status === 422){
          dispatch(add_alarm_error({errors: error.response.data.error}))
        }
        console.log(error)
      })
  }
}


export const fetch_assets_infos = () => {
  return (dispatch) => {
    axios.get('/api/v1/public/asset_infos/all', {headers: {responseType: 'json'}})
      .then((response) => {
        dispatch(assets_infos_fetched({assets_infos: response.data.assets_infos}))
      })
      .catch((error) => {
        console.log(error)
      })
  }
}


export const set_create_alarm_error = (errors) => {
  return (dispatch) => {
    dispatch(add_alarm_error({errors: errors}))
  }
}
