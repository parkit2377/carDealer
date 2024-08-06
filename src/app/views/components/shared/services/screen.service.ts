import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private screenWidth = new BehaviorSubject<number>(window.innerWidth);


  constructor(){
    
  }

  getScreenWidth() {
    return this.screenWidth.asObservable();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth.next(event.target.innerWidth);
  }
}
