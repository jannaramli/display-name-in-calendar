import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions,FullCalendarComponent ,EventInput} from '@fullcalendar/angular'; // useful for typechecking
import { Router } from '@angular/router';

@Component({
  selector: 'app-listbirth',
  templateUrl: './listbirth.component.html',
  styleUrls: ['./listbirth.component.scss']
})

export class ListbirthComponent implements OnInit {

constructor(private router:Router) {}

@ViewChild('calendarBirth', { static: true }) calendarBirth: FullCalendarComponent;

INITIAL_EVENTS: EventInput[] = []

todayu = new Date();
yearToday = this.todayu.getFullYear()
//yearMonth = this.todayu.getMonth()+1

reloadComponent() {
  let currentUrl = this.router.url;
  this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  this.router.onSameUrlNavigation = 'reload';
  this.router.navigate([currentUrl]);
}

existBirth:boolean;
checkIfEventExist(currentEvent:any, existingEventsList:any) {
  // 1. .some - check sama ada currentEvent 
  const existBirth = existingEventsList.some(function (existingEventItem: any) {
    return (existingEventItem.title === currentEvent.title) && (existingEventItem.date === currentEvent.date);
  });

  console.log(currentEvent);
  console.log(existingEventsList);
  console.log(existBirth);
  return existBirth;
}

eventBirth(){
  const namapemohon=JSON.parse(localStorage.getItem('Users') || '{}');
  console.log(namapemohon);

  for(let i=0; i<namapemohon.length; i++) {

    type EventObject = {
      title: string;
      date: any;
    }

    const eventObject: EventObject = {
      title: (namapemohon[i].name),
      date: (this.yearToday + "-" + namapemohon[i].month + "-" + namapemohon[i].day), 
    }
  
    const isExist = this.checkIfEventExist(eventObject, this.INITIAL_EVENTS);
    if(!isExist) {
      //here
     this.calendarBirth.getApi().addEvent(eventObject);
    } 

    console.log(this.INITIAL_EVENTS);

  } //end for loop
 
}

//display username based on DOB
ngOnInit(): void {
  const namapemohon=JSON.parse(localStorage.getItem('Users') || '{}')
  console.log(namapemohon);

  for(let i=0; i<namapemohon.length; i++){ 
    this.INITIAL_EVENTS.push(
      {
        title: (namapemohon[i].name),
        date: (this.yearToday + "-" + namapemohon[i].month + "-" + namapemohon[i].day), 
      }
    )
    
    console.log(this.yearToday);
    console.log(namapemohon[i].month);
    console.log(namapemohon[i].day);
  }//end forloop

  console.log(this.INITIAL_EVENTS);
}

//template of calendar
calendarOptions: CalendarOptions = {
  contentHeight: 700,
  dayMaxEvents: true, 
  initialView: 'dayGridMonth',
  dateClick: this.handleDateClick.bind(this),
  initialEvents:this.INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed

  views: {
    listMonth: { buttonText: 'list born by month' },//custom view for title
  }, 

  headerToolbar:{
    left: 'prev,next today prevYear nextYear',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,dayGridDay,listMonth', 
  }, 
  
  customButtons:{
    prev:{
      click:()=>{
        this.calendarBirth.getApi().prev();
        this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getMonth()+1;

        console.log(this.yearToday);
      },
    },

    next:{
      click:()=>{
        this.calendarBirth.getApi().next();
        this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getMonth()+1;

        console.log(this.yearToday);
      },
    },

    today:{
      text:'today birthD',
      click:()=>{
        this.calendarBirth.getApi().today();
        this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getFullYear();
        this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getMonth()+1;
            
        console.log(this.yearToday);
      },
    },

    prevYear: {
        click:()=>{
          this.calendarBirth.getApi().prevYear();
          this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getFullYear();

          console.log(this.eventBirth());
          console.log(this.yearToday);
        },
    },

    nextYear: {
      click:()=>{
        this.calendarBirth.getApi().nextYear();
        this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getFullYear()

          //this.eventBirth();

          console.log(this.eventBirth());
          console.log(this.yearToday);
      },
    },
  },//end custom button

};//end calendar template

//function klik day 
handleDateClick(arg:any){
    alert('date click! ' + arg.dateStr); 
    console.log(arg);
  }

}