import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CalendarOptions } from '@fullcalendar/angular';
import { CalendarEventsService } from '../../services/calendar-events.service';

@Component({
  selector: 'app-case-worker-dashboard',
  templateUrl: './case-worker-dashboard.component.html',
  styleUrls: ['./case-worker-dashboard.component.scss'],
})
export class CaseWorkerDashboardComponent implements OnInit {
  public items: any;
  public display = false;
  public eventList: any = [];
  public totalEvents: any = [];
  public tagName = 'Appointment';
  public eventsForm!:FormGroup;
  constructor(private service: CalendarEventsService, private formBuilder: FormBuilder) {
    this.service.getEvents().subscribe(data =>{
      this.totalEvents=data;
      console.log(this.totalEvents);
      this.eventList=this.totalEvents;
    })
  }

  ngOnInit(): void {
    console.log('case worker dashboard component');
    this.items = [
      { label: 'Appointment', icon: 'pi pi-fw pi-calendar' },
      { label: 'Event', icon: 'pi pi-fw pi-pencil' },
    ];
    this.builtForm();
  }
  public builtForm()
  {
this.eventsForm = this.formBuilder.group({
eventTitle:['', Validators.required],
eventDate:['', Validators.required],
eventDescription:['', Validators.required],
startTime:['', Validators.required],
endTime:['', Validators.required]
})
  }
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    selectable: true,
    dateClick: function (info) {
      alert('Date: ' + info.dateStr);
    },
    headerToolbar: {
      start: 'prev,next',
      center: 'title',
      end: 'dayGridMonth,timeGridWeek,listWeek',
    },
    nowIndicator: true,
    events: './assets/mock/calendarEvents.json',
  };
  addEvent() {
    this.display = true;
  }
  get getControl()
  {
    return this.eventsForm.controls;
  }
  onSubmit() {
   console.log(this.eventsForm.value);
  let a = this.eventsForm.value;
    let newEvent={'title':a.eventTitle,'date':a.eventDate};
    this.eventList.push(newEvent);
    console.log(this.eventList);
    this.calendarOptions.events = this.eventList;
    console.log(this.calendarOptions.events)
    this.display = false;
   
  }
  onCancel() {
   this.eventsForm.reset();
    this.display = false;
  }
  changeTag(value: any) {
    console.log(value.activeItem.label);
    this.tagName=value.activeItem.label;
  }
  crossButton() {
 this.eventsForm.reset();
  }
  showEventDetail(arg:any) {
    console.log(arg)
    console.log(arg.jsEvent.target)
    
  }
}
