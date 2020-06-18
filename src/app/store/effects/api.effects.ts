import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { ApiActionTypes, LoadApiAction , LoadApiSuccessAction , LoadApiFailureAction } from '../actions/api.actions'
import { of, concat } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Injectable()
export class ApiEffects {
  @Effect() loadApi$ = this.actions$
    .pipe(
      ofType<LoadApiAction>(ApiActionTypes.LOAD_API),
      mergeMap(
        () =>{ 
          return concat(this.api.getCVS(), this.api.getSkills())
          .pipe(
            map(data => {
              return new LoadApiSuccessAction(data)
            }),
            catchError(error => of(new LoadApiFailureAction(error)))
          ) }
      ),
  )

  constructor(
    private actions$: Actions,
    private api: ApiService
  ) { }
}