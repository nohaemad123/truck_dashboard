import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IContact, Table_Coloumns, small_columns } from '../models/contact-us';
import Swal from 'sweetalert2';
import { HttpService } from '@core/services/http.service';
import { IModal } from '@core/@ui-components/modal/model/modal.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from '@core/@ui-components/modal/service/modal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  contentHeader: any;
  public Table_Coloumns = Table_Coloumns
  public searchValue = '';
  private tempData = [];
  ItemsPerpage = 30;
  allContacts: any;
  public selections: any[] = [];
  public small_columns = small_columns
  contactData: any;
  editContactOptoinsModal: IModal;
  editContactForm: FormGroup
  contactObj = new IContact()
  @ViewChild('editNewContact') editNewContact: ElementRef | undefined;
  submitted=false;
  loading=false;
  contactobj= new IContact();
contactId:any
  constructor(private _httpService: HttpService,
    private fb: FormBuilder,
    private _customModalService:ModalService,
    private  toastr:ToastrService) { }

  ngOnInit(): void {
    this.contentHeader = {
      headerTitle: "الدعم الفني",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "الرئيسية",
            isLink: true,
            link: "/",
          },

          {
            name: "الدعم الفني",
            isLink: false,
          },
        ],
      },
    };
    
    this.CreateContactForm()
    this.getAllContact()
  }

  filterUpdate(event) {
    this.searchValue = event.target.value;
  }

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
    this.getAllContact();
  }

  get buisnessFormControls() {
    return this.editContactForm.controls;
  }

  CreateContactForm() {
    this.editContactForm = this.fb.group({
      name: [this.contactObj.name, [Validators.required]],
      email: [this.contactObj.email, [Validators.required]],
      phone: [this.contactObj.phone, [Validators.required]],
      tite: [this.contactObj.phone, [Validators.required]],
      message: [this.contactObj.message, [Validators.required]]

    });

  }

  closeModal(){
    this._customModalService.dissmissMoadal(this.editNewContact);
    this.resetMyBankForm();
    this.getAllContact()


  }

  resetMyBankForm(){
    this.submitted=false;
    this.editContactForm.reset()
    this.buisnessFormControls.name.setErrors(null);
    this.getAllContact()
  }

  getAllContact() {
    this.allContacts = [];
    this._httpService.get('/CountactUs/GetAllCountactUs', { CountItems: this.ItemsPerpage, page: 1 }, false).subscribe((res: any) => {
      this.allContacts = res.items

      // console.log('cities',this.allCities)
    });
  }

  deleteBank(id: any) {

    Swal.fire({
      title: "هل انت متأكد انك تريد حذف الرسالة?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: "الغاء",
      confirmButtonText: "نعم احذف!"
    }).then((result) => {
      if (result.isConfirmed) {
        this._httpService.delete('/CountactUs', { Id: id }).subscribe((data: any) => {
          // console.log(data);
          if (data) {
            Swal.fire({
              icon: 'success',
              title: "تم حذف الرسالة !",
              text: "تم حذف الرسالة بنجاح",
              confirmButtonText: "نعم",
              showConfirmButton: true,
              timer: 1500
            }).then((result) => {

              this.getAllContact();

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

  EditContact(e: any) {
    console.log("contact: ",e.row)
    if (e.row.id > 0) {
      this.editContactOptoinsModal = {
        headerTitle: 'تعديل الدعم الفني',
        modalname: 'editNewContact',
      };

      this.contactId=e.id
      this.contactData = e.row;
      console.log(this.contactData)
      this.editContactForm.patchValue(this.contactData as IContact);
      // this.editContactForm.controls['name'].setValue(this.contactData.name)
      this._customModalService.openModal(this.editNewContact, 'md');

    
    }
  }

  updateContact(){
    this.submitted = true;

    console.log("form value: ",this.editContactForm.value)

    if (this.editContactForm.invalid) {
      return;
    }

    
    this.loading = true;
    Object.assign(this.contactobj, this.editContactForm?.value);

    // console.log('this.addBankForm',this.settingsFrom.value);
    
    this._httpService.put(`/CountactUs/UpdateCountactUs/${this.contactId}`,null,this.contactobj,false).subscribe((res: any) => {
      console.log(res)
      if (res) {
        this.toastr.success(
          "تم تعديل الرسالة بنجاج",
          "تعم التعديل!",
          {
            toastClass: "toast ngx-toastr",
            closeButton: true,
          }
        );
        this.resetMyBankForm();
        this.closeModal();
        this.loading = false;
      }
    },((err=>{
      this.loading = false;
    })),()=>{
      this.loading = false;

    })




  }
}
