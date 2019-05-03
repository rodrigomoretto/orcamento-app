import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ObjectAccessService {

  object: any;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router) {

  }

  getObject(activedRoute, router): void {
    activedRoute.queryParams.subscribe(params => {
      if (router.getCurrentNavigation().extras.state) {
        this.object = router.getCurrentNavigation().extras.state;
      }
    });


      console.log(this.object);


    // return this._activatedRoute.queryParams
    //   .subscribe(params => {
    //     if (this._router.getCurrentNavigation().extras.state) {
    //       this.object = this._router.getCurrentNavigation().extras.state[nomeObject]
    //       console.log(this.object);
    //       return this.object;
    //     }
    //   });
  }
}
