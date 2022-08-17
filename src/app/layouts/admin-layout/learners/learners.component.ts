import { Component, OnInit } from '@angular/core';
import { CourseService } from 'app/layouts/learner-layout/services/course.service';
import { CourseService as CourseServ } from '../services/course.service';

import { map, mergeMap, switchMap } from 'rxjs/operators';
import { CentreService } from '../services/centre.service';

@Component({
  selector: 'app-learners',
  templateUrl: './learners.component.html',
  styleUrls: ['./learners.component.scss']
})
export class LearnersComponent implements OnInit {

  selectedoption;
  selectedcentre: any;
  selectedcourse:any;
  options =[{id:1, value: "Course specific"}, {id:0, value:"Centre specific"}];
  courses: any[] =[];
  centres: any[] =[];
  dropdownList: any[][];
  ViewList: any[] = [];

  users: any[] = [];



  constructor(private coursesService: CourseService,private coreCourseService: CourseServ, private CentreService:CentreService) {
    this.coursesService.getCentres().pipe(
      switchMap(centres=>this.coursesService.getAllCourses()
      .pipe(map(courses=>[centres, courses])))
    ).subscribe((finalData: any) => {
      this.courses =  finalData.centres;
      this.centres =  finalData.courses;
      this.dropdownList = finalData;

      console.log( this.dropdownList )
    })


    }

  onSelect(evt){
    // console.log(this.selectedoption)
    var selectedList = this.dropdownList[evt.value]
    this.ViewList = selectedList;
  }

  ngOnInit() {
  }

  filter(option, id) {
    this.users = [];
    if(option ==0) {
      this.CentreService.getSpecificCentreStudents(id).subscribe((result:any) => {
       const users = result.map((user: any) => {
          this.users.push({
            FirstName:  user.User.FirstName,
            Surname:  user.User.Surname,
            UserTypeId: this.getUserTypeDesc(user.User.UserTypeId)
          })


        });
    //   console.log(this.users , result);
      })
    }else {

      this.coreCourseService.getSpecificCourseStudents(id).subscribe(data => {
        const users = data.map((user: any) => {
          this.users.push({
            FirstName:  user.User.FirstName,
            Surname:  user.User.Surname,
            UserTypeId: this.getUserTypeDesc(user.User.UserTypeId)
          })


        });
        console.log(this.users , data);
      })
    }
  }

  getUserTypeDesc(value) {
    return value == 0 ?  "Junior" : "Senior";
  }
}



