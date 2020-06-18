import { ApiActionTypes, ApiAction } from '../actions/api.actions';
import { Cv, Skills } from '../models/api.model';

export interface ApiState {
  cv: Cv,
  skills: Skills[],
  loading: boolean,
  error: Error
}

const initialState: ApiState = {
  cv: undefined,
  skills: [],
  loading: false,
  error: undefined
};

export function ApiReducer(state: ApiState = initialState, action: ApiAction) {
  switch (action.type) {
    case ApiActionTypes.LOAD_API:
      return {
        ...state,
        loading: true
      }
    case ApiActionTypes.LOAD_API_SUCCESS:
      let prop: any;
      if(isCv(action.payload))
      {
        prop = { cv: action.payload }
      }else{
        prop = { skills: action.payload }
      }
      return { 
        ...state,
        ...prop,
        loading: false 
      };
    case ApiActionTypes.LOAD_API_FAILURE:
      return { 
        ...state,
        error: action.payload,
        loading: false 
      };
    default:
      return state;
  }
}

const isCv = (toBeDetermined: Cv | Skills[]): toBeDetermined is Cv => {
  if((toBeDetermined as Cv).title){
    return true
  }
  return false
}