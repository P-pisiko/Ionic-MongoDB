import { Component } from '@angular/core';
import { ExpressMongoService } from '../express-mongo.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private mongo:ExpressMongoService) {}
  outMsg: any; cId: any; wDay: any; prof: any;
  outRec: any = [];

  insert() {
    const data = {
      cid: this.cId, wday: this.wDay,
      prof: this.prof
    };
    this.mongo.insert(data).subscribe({
      next: (data: any) => {
        console.log(data);
        this.outMsg = data.message;
        this.outRec = [];
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }

  retrieve() {
    const params = { cid: this.cId };
    this.mongo.retrieve(params).subscribe({
      next: (data: any) => {
        console.log(data);
        this.outRec = data;
        this.outMsg = this.outRec.length + 'retrieved';
      },
      error: (e) => {
        console.error(e);
        this.outMsg = e.message;
      },
      complete: () => console.info('Complete')
    });
  }


}
