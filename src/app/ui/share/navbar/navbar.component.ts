import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { User } from 'src/app/model/user-login';
import { StringeeService } from 'src/app/service/stringee.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FileService } from 'src/app/service/file.service';
import { Profile } from 'src/app/model/profile';
import { ConfirmedValidator } from 'src/app/helpers/confirmed.validator';
import { ToastrService } from 'ngx-toastr';
import { ConfirmedNewPassValidator } from 'src/app/helpers/confirmedNewPass.validator';

class ImageSnippet {
  constructor(public src: string, public file: File) {
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  user: User;
  form: FormGroup;
  formPass: FormGroup;
  submitted = false;
  file: any;
  profileUpdate: Profile
  showProfile = false;
  showChangePass = false;

  constructor(
    private accountService: AccountService,
    private stringeeService: StringeeService,
    private formBuilder: FormBuilder,
    private fileService: FileService,
    private toastr: ToastrService,

  ) {
    this.user = accountService.userValue;
  }

  ngOnInit(): void {
    this.validate();
    this.validateFormPass();
  }

  validate() {
    this.form = this.formBuilder.group({
      email: [this.user.email, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      fullName: [this.user.fullName, Validators.required],
      phone: [this.user.phone, [Validators.required, Validators.pattern("((09|03|07|08|05)+([0-9]{8}))")]],
      imageUrl: [this.user.imageUrl],
    });

  }

  validateFormPass() {
    this.formPass = this.formBuilder.group({
      oldPass: ['', Validators.required],
      newPass: ['', Validators.required],
      reNewPass: ['', Validators.required]
    },
      {
        validator: ConfirmedValidator('newPass', 'reNewPass'),
        validators: ConfirmedNewPassValidator('oldPass', 'newPass')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }
  get p() { return this.formPass.controls; }

  selectedFile: ImageSnippet;
  filePath: any;

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];

    const read = new FileReader();

    if (this.showProfile) {
      read.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
        if (this.selectedFile) {
          this.file = file;
          this.filePath = this.selectedFile.src;
        }
      });
    }

    read.readAsDataURL(file);
  }

  onUpdateProfile() {
    this.submitted = true;

    // dừng lại tại đây nếu các trường không hợp lệ
    if (this.form.invalid) {
      return;
    }

    this.profileUpdate = this.form.value;
    this.profileUpdate.id = this.user.id;

    if (this.file != null) {
      var formData = new FormData();
      formData.set('file', this.file);

      this.fileService.uploadFile(formData).subscribe(res => {
        this.profileUpdate.imageUrl = res.filename;
        this.accountService.updateProfile(this.profileUpdate).subscribe(
          data => {
            //nếu cập nhật thành công thì cập nhật profile trên server stringee
            this.stringeeService.connectStringeeToUpdate(data.token);
          },
          error => {
            this.showError(error);
          }
        );
      })
    }
    else {
      this.accountService.updateProfile(this.profileUpdate).subscribe(
        data => {
          //nếu cập nhật thành công thì cập nhật profile trên server stringee
          this.stringeeService.connectStringeeToUpdate(this.user.token);
          this.hideUpdateProfile();
          this.submitted = false;
        },
        error => {
          this.showError(error);
        });
    }
  }

  showError(error: string) {
    this.toastr.error(error);
  }

  showSuccess(success: string) {
    this.toastr.success(success);
  }

  onchangePass() {
    this.submitted = true;

    // dừng lại tại đây nếu các trường không hợp lệ
    if (this.formPass.invalid) {
      return;
    }

    let updatePass = {
      oldPass: this.formPass.value.oldPass,
      newPass: this.formPass.value.newPass,
      id: this.user.id
    }

    this.accountService.updatePassword(updatePass).subscribe(
      data => {
        //nếu cập nhật thành công
        this.showSuccess(data.result);
        this.hideUpdatePassword();
      },
      error => {
        this.showError(error);
      });
  }

  //hiện modal cập nhật thông tin user
  showUpdateProfile() {
    this.showProfile = true;
    document.getElementById("modal-update-profile").style.display = 'flex';
  }

  //ẩn modal cập nhật thông tin user
  hideUpdateProfile() {
    this.showProfile = false;
    this.filePath = null;
    document.getElementById("modal-update-profile").style.display = 'none';
  }

  showUpdatePassword() {
    this.showChangePass = true;
    document.getElementById("modal-update-password").style.display = 'flex';
  }

  hideUpdatePassword() {
    this.showChangePass = false;
    document.getElementById("modal-update-password").style.display = 'none';
  }

  //đăng xuất
  logout() {
    this.accountService.logout();
    this.stringeeService.disconnectStringee();
  }
}
