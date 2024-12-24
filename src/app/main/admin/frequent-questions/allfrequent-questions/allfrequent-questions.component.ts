import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '@core/services/http.service';
import { CoreTranslationService } from '@core/services/translation.service';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { FrequentQuestion, Table_Coloumns, small_columns } from '../models/frequent-questions';

@Component({
  selector: 'app-allfrequent-questions',
  templateUrl: './allfrequent-questions.component.html',
  styleUrls: ['./allfrequent-questions.component.scss']
})
export class AllfrequentQuestionsComponent implements OnInit {

  public selectedOption = 10;
  ItemsPerpage=30;
  contentHeader:any;
  public searchValue = '';
  public ColumnMode = ColumnMode;
  public temp = [];
  public previousRoleFilter = '';
  public previousPlanFilter = '';
  public previousStatusFilter = '';
  // public SelectionType = SelectionType;
  public selected = [];
  allQuestion: any;
  cityData:any;
  public small_columns = small_columns;
  arrfillter = ['question', 'answer', 'sort'];

  public Table_Coloumns=Table_Coloumns
  public selectRole: any = [
    { name: 'All', value: '' },
    { name: 'Admin', value: 'Admin' },
    { name: 'Author', value: 'Author' },
    { name: 'Editor', value: 'Editor' },
    { name: 'Maintainer', value: 'Maintainer' },
    { name: 'Subscriber', value: 'Subscriber' }
  ];

  public selectPlan: any = [
    { name: 'All', value: '' },
    { name: 'Basic', value: 'Basic' },
    { name: 'Company', value: 'Company' },
    { name: 'Enterprise', value: 'Enterprise' },
    { name: 'Team', value: 'Team' }
  ];

  public selectStatus: any = [
    { name: 'All', value: '' },
    { name: 'Pending', value: 'Pending' },
    { name: 'Active', value: 'Active' },
    { name: 'Inactive', value: 'Inactive' }
  ];

  public selectedRole = [];
  public selectedPlan = [];
  public selectedStatus = [];
  public selections:any[]=[];
  submitted=false;
   loading=false;
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  userobj= new FrequentQuestion();
  addCityForm:FormGroup;
cityId:any;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  
  constructor(private _coreTranslationService: CoreTranslationService,
    private _httpService:HttpService,
    private fb:FormBuilder) {
    // this._coreTranslationService.translate(english, arabic);
  }

  get CityFormControls() {
    return this.addCityForm.controls;
  }

 

  ngOnInit(): void {
   
    this.getAllUsers()
    this.contentHeader = {
      headerTitle: 'كل الاسئلة',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'الرئيسية',
            isLink: true,
            link: '/'
          },
          {
            name: 'كل الاسئلة',
            isLink: false
          }
        ]
      }
    };
  }

   /**
   * filterUpdate
   *
   * @param event
   */
   filterUpdate(event) {
    this.searchValue = event.target.value;
  }

  /**
 * For ref only, log selected values
 *
 * @param selected
 */
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }


  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousPlanFilter, this.previousStatusFilter);
    this.allQuestion = this.temp;
  }

  /**
   * Filter By Plan
   *
   * @param event
   */
  filterByPlan(event) {
    const filter = event ? event.value : '';
    this.previousPlanFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, filter, this.previousStatusFilter);
    this.allQuestion = this.temp;
  }

  /**
   * Filter By Status
   *
   * @param event
   */
  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, this.previousPlanFilter, filter);
    this.allQuestion = this.temp;
  }

  /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param statusFilter
   */
  filterRows(roleFilter, planFilter, statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    roleFilter = roleFilter.toLowerCase();
    planFilter = planFilter.toLowerCase();
    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialNameMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      const isPartialGenderMatch = row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
      const isPartialStatusMatch = row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch && isPartialGenderMatch && isPartialStatusMatch;
    });
  }



  filterByPage() {
    this.getAllUsers();
  }
  getAllUsers() {
    this.allQuestion=[];
    this._httpService.get('/Fqas/GetAllFqas',{CountItems:this.ItemsPerpage,page:1},false).subscribe((res: any) => {
      this.allQuestion = res.items
//       this.allQuestion.forEach((elem=>{
//         elem.questionAr=' أين يمكنني أن أشاهد؟ ';
//         elem.questionEn=' Where can I watch? ';
//         elem.answerEn="to the claims of duty or the obligations of business it will frequently",
// elem.answerAr="لمطالبات الواجب أو التزامات العمل في كثير من الأحيان"
//         elem.sequence="1"
//       }))
      console.log('cities',this.allQuestion)
    });
  }

  resetMyBankForm(){
    this.submitted=false;
    this.addCityForm.reset()

  }

  deleteQuestion(id: any) {
    console.log(    this.selections
      )
    Swal.fire({
      title: "هل انت متأكد انك تريد حذف السؤال?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:"الغاء" ,
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/Fqas',{Id:id}).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف السؤال !" ,
              text: "تم حذف السؤال بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result)=>{
             
              this.getAllUsers();

            });
          } else {
            Swal.fire({
              icon: 'error',
              title: "error",
              text: data.responseMessage,
              showConfirmButton: true,
              timer: 1500
            })
          }
        })
      }
   
    })
}

}