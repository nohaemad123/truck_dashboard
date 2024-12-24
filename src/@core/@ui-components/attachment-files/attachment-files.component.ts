import {
  Component,
  OnInit,
  ViewEncapsulation,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  NgZone,
} from '@angular/core';

import {
  HttpClient,
  HttpEventType,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  IAttactmentFile,
  FileType,
  Actions,
} from './model/attactmentfile.interface';
// import { StationService } from '../../sections/stations/stations.service';
// import { CommonService } from '../../app/shared/services/common.service';

@Component({
  selector: 'app-attachment-files',
  templateUrl: './attachment-files.component.html',
  styleUrls: ['./attachment-files.component.scss'],
})
export class AttachmentFilesComponent implements OnInit {
  // Type!: FileType;
  @Input() AttactmentFileOptions: IAttactmentFile = {
    type: FileType.Mulltiple,
    filesAllowed: [],
    size: '',
    actions: {
      delete: 'delete',
    },
  };

  @Input('files') files: any = [];
  @Input('type') type: string | undefined;
  @Input('folderName') folderName: string | undefined;

  @Output() setFiles = new EventEmitter<any>();
  @Output() setImages = new EventEmitter<any>();

  @Output() setVideos = new EventEmitter<any>();
  // public commonService: CommonService,
  showModal: boolean = false;
  imgPreview: any;

  fileflage = false;
  videoflage = false;
  imageflage = false;
  constructor(
    public http: HttpClient,
    //   public infoService: StationService,
    public ngZone: NgZone
  ) {}

  ngOnInit() {
    if (this.files.length <= 0) {
      this.files = [];
    }
    // localUrl: this.commonService._ImageUrl + 'no_image.png',
    let file = {
      isUpload: false,
      localUrl: 'assets/img/no_image.png',

      id: '',
      progress: 1,
    };

    if (this.files) {
      let index = this.files.findIndex((e: any) => {});

      if (index == -1) {
        this.files.unshift(file);
      }
    }
  }

  showPreviewFile(event: any, item_id: any = 0) {
    // console.log('event', event)

    if (
      this.AttactmentFileOptions.filesAllowed.some((e) => e.includes('image'))
    ) {
      this.imageflage = true;
    }  if (
      this.AttactmentFileOptions.filesAllowed.some((e) => e.includes('video'))
    ) {
      this.videoflage = true;
    } else {
      this.fileflage = true;
    }

    if (event.target.files.length > 0) {
      let length = this.files.length - 1;
      let fileIndex = 0;
      for (
        let index = length;
        index < event.target.files.length + length;
        index++
      ) {
        this.files.push({
          isUpload: false,
          localUrl: 'assets/img/no_image.png',
          id: '',
          file:'',
          progress: null,
        });
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log('event.target',event.target);

          this.files[index + 1].localUrl = event.target.result;


        };
        var fileName = event.target.files[index].name;
          this.files[index + 1].file = fileName;

        reader.readAsDataURL(event.target.files[fileIndex]);

        let formData = new FormData();
        // formData.append('file', event.target.files[fileIndex]);
        // let url = '';
        // let url = this.commonService._hostName + 'upload.php?file_type=' + this.type + '&uploadFolderName=' + this.folderName;
        // this.http.post(url, formData, {
        //     reportProgress: true,
        //     observe: "events"
        // }).pipe(

        //     map((event: any) => {
        //         if (event.type == HttpEventType.UploadProgress) {
        //             this.ngZone.run(() => {
        //                 this.files[index + 1].progress = Math.round((100 / event.total) * event.loaded);
        //             })

        //         } else if (event.type == HttpEventType.Response) {
        //             //console.log(event.body, "event.body")
        //             if (event.body) {
        //                 if (event.body.file_name) {
        //                     if (this.type == 'images') {
        //                         this.files[index + 1]['img'] = event.body.file_name
        //                     }
        //                     else if (this.type == 'video') {
        //                         this.files[index + 1]['video'] = event.body.file_name
        //                     } else {
        //                         this.files[index + 1]['file'] = event.body.file_name
        //                     }

        //                     // this.files[index + 1]['video'] = event.body.file_name
        //                     this.files[index + 1]['isUpload'] = true
        //                     this.files[index + 1]['localUrl'] = event.body.file_name
        //                     this.files[index + 1].progress = null;
        //                     // this.type == 'images' ? this.setImages.emit(this.files) : this.setFiles.emit(this.files)

        //                     if (this.type == 'images') {
        //                         this.setImages.emit(this.files)
        //                     }
        //                     else if (this.type == 'video') {
        //                         this.setVideos.emit(this.files)
        //                     } else {
        //                         this.setFiles.emit(this.files)
        //                     }

        //                 } else {
        //                     this.files[index + 1]['isUpload'] = false
        //                     this.files[index + 1].progress = null;
        //                 }

        //             } else {
        //                 this.files[index + 1]['isUpload'] = false
        //                 this.files[index + 1].progress = null;
        //             }

        //         }

        //     }),
        //     catchError((err: any) => {
        //         this.files[index + 1]['isUpload'] = false
        //         this.files[index + 1].progress = null;
        //         return throwError(err.message);
        //     })
        // ).toPromise();

        fileIndex += 1;
      }
    }
  }
  removeFile(index: any) {
    this.files.splice(index, 1);
    if (this.type == 'images') {
      this.setImages.emit(this.files);
    } else if (this.type == 'video') {
      this.setVideos.emit(this.files);
    } else {
      this.setFiles.emit(this.files);
    }
  }

  previewFile(item: any) {
    console.log('prrrrrrr');
    this.imgPreview = '';
    this.imgPreview = item.localUrl;
    this.showModal = true;
  }

  hide() {
    this.showModal = false;
  }

  openAttactments(file:any){
    window.open(file, "_blank");
  }




}
