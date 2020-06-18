import { Action } from '@ngrx/store';
import { Cv, Skills } from '../models/api.model';

export enum ApiActionTypes {
  LOAD_API = '[API] Load Cv',
  LOAD_API_SUCCESS = '[API] Load Cv Success',
  LOAD_API_FAILURE = '[API] Load Cv FAILURE',
}

export class LoadApiAction implements Action {
  readonly type = ApiActionTypes.LOAD_API
}

export class LoadApiSuccessAction implements Action {
  readonly type = ApiActionTypes.LOAD_API_SUCCESS

  constructor(public payload: Cv | Skills[]) {}

}
export class LoadApiFailureAction implements Action {
  readonly type = ApiActionTypes.LOAD_API_FAILURE
  
  constructor(public payload: Error) {}
}

export type ApiAction = LoadApiAction | LoadApiSuccessAction | LoadApiFailureAction;