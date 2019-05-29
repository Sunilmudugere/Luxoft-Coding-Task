import { Component, OnInit, Input, OnChanges, SimpleChange, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { CountDownnComponent } from '../countDownn/countDownn.component';

@Component({
  selector: 'app-Test',
  templateUrl: './Test.component.html',
  styleUrls: ['./Test.component.css']
})
export class TestComponent implements OnInit, OnChanges, AfterViewInit {

  
  @Input() major: number;
  @Input() minor: number;
  @Output() childHasUpdated = new EventEmitter();
   @ViewChild(CountDownnComponent)
   private timerComponent: CountDownnComponent;
  changeLog: string[] = [];
  child:string = "Super";
  ngOnInit() {
  }
   startP() { this.timerComponent.start(); }
   stopP() { this.timerComponent.stop(); }
  // seconds() {return 0}
  ngAfterViewInit(){
   // setTimeout(() => this.seconds = () => this.timerComponent.seconds, 0);
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    for (let propName in changes) {
      let changedProp = changes[propName];
      let to = JSON.stringify(changedProp.currentValue);
      if (changedProp.isFirstChange()) {
        log.push(`Initial value of ${propName} set to ${to}`);
      } else {
        let from = JSON.stringify(changedProp.previousValue);
        log.push(`${propName} changed from ${from} to ${to}`);
      }
    }
    this.changeLog.push(log.join(', '));
  }
  childUpdated(){
    this.childHasUpdated.emit(this.child);
  }

}
