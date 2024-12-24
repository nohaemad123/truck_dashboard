import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxCroppedEvent, NgxPhotoEditorService } from 'ngx-photo-editor';
import { Observable } from 'rxjs';
import { FilesUploadService } from './services/files-upload.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.component.html',
  styleUrls: ['./attachments.component.scss']
})
export class AttachmentsComponent implements OnInit {

  imageSrc: string = '';
  output: NgxCroppedEvent | undefined ;

  myForm = new FormGroup({

    name: new FormControl('', [Validators.required, Validators.minLength(3)]),

    file: new FormControl('', [Validators.required]),

    fileSource: new FormControl('', [Validators.required])

  });

  

  constructor(
    private http: HttpClient,
    private service: NgxPhotoEditorService,
    private uploadService: FilesUploadService
    ) { }

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }

  /**

   * Write code on Method

   *

   * @return response()

   */

  // get f(){

  //   return this.myForm.controls;

  // }

  

  /**

   * Write code on Method

   *

  //  * @return response()

   */

  onFileChange(event:any) {


    this.service.open(event, {
      aspectRatio: 4 / 3,
      autoCropArea: 1,
      imageQuality:100,
      mask:true,
      guides:true,
      imageSmoothingEnabled:true,
      imageSmoothingQuality:'high',


    }).subscribe(data => {
      this.output = data;
      console.log("🚀 ~ fileChangeHandler ~  this.output",  this.output)
      
      
    });





    const reader = new FileReader();

    

    if(event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);

    

      reader.onload = () => {

   

        this.imageSrc = reader.result as string;

     

        this.myForm.patchValue({

          fileSource: reader.result as string

        });

   

      };

   

    }

  }

  

  /**

   * Write code on Method

   *

  //  * @return response()

   */

  submit(){

    console.log(this.myForm.value);

    this.http.post('http://localhost:8001/upload.php', this.myForm.value)

      .subscribe((res:any) => {

        console.log(res);

        alert('Uploaded Successfully.');

      })
    }










    selectedFiles?: FileList;
    progressInfos: any[] = [];
    message: string[] = [];
  
    previews: string[] = [];
    imageInfos?: Observable<any>;

    selectFiles(event: any): void {
      console.log("🚀 ~ selectFiles ~ event", event)
      // this.message = [];
      // this.progressInfos = [];
      // this.selectedFiles = event.target.files;
      this.service.open(event, {
      aspectRatio: 4 / 3,
      autoCropArea: 1,
      imageQuality:100,
      mask:true,
      guides:true,
      imageSmoothingEnabled:true,
      imageSmoothingQuality:'high',


    }).subscribe(data => {
      this.output = data;
      console.log("🚀 ~ fileChangeHandler ~  this.output",  this.output)
      
      
    });

      this.previews = [];
      if (this.selectedFiles && this.selectedFiles[0]) {
        const numberOfFiles = this.selectedFiles.length;
        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();
    
          reader.onload = (e: any) => {
            console.log(e.target.result);
            this.previews.push(e.target.result);
          };
    
          reader.readAsDataURL(this.selectedFiles[i]);
        }
      }
    }

    uploadFiles(): void {
      this.message = [];
    
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.upload(i, this.selectedFiles[i]);
        }
      }

     
    }

    upload(idx: number, file: File): void {
      this.progressInfos[idx] = { value: 0, fileName: file.name };
    
      if (file) {
        this.uploadService.upload(file).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              const msg = 'Uploaded the file successfully: ' + file.name;
              this.message.push(msg);
              this.imageInfos = this.uploadService.getFiles();
            }
          },
          error: (err: any) => {
            this.progressInfos[idx].value = 0;
            const msg = 'Could not upload the file: ' + file.name;
            this.message.push(msg);
          }});
      }
    }

  }