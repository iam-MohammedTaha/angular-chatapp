import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, concatMap, mergeMap, of, switchMap, tap } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '@angular/fire/auth';
import { ImageUploadService } from '../../services/image-upload.service';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';
import { ProfileUser } from '../../models/user';


@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user$ = this.usersService.currentUserProfile$;

  // user$ = this.authService.currentUser$;

  profileForm = this.fb.group({
    uid: [''],
    displayName: [''],
    firstName: [''],
    lastName: [''],
    phone: [''],
    address: [''],
  });

  constructor(
    private authService: AuthenticationService,
    private imageUploadService: ImageUploadService,
    private toast: ToastrService,
    private usersService: UsersService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this), tap(console.log))
      .subscribe((user) => {
        this.profileForm.patchValue({ ...user });
      });
  }

  // uploadFile(event: any, user: User) {
  //   this.imageUploadService
  //     .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
  //     .pipe(
  //       this.toast.observe({
  //         loading: 'Uploading profile image...',
  //         success: 'Image uploaded successfully',
  //         error: 'There was an error in uploading the image',
  //       }),
  //       // switchMap((photoURL) =>
  //       //   this.usersService.updateUser({
  //       //     uid,
  //       //     photoURL,
  //       //   })
  //       // )
  //       concatMap((photoURL) => this.authService.updateProfileData({photoURL}))
  //     )
  //     .subscribe();
  // }

  uploadFile(event: any, user: ProfileUser) {
    const file = event.target.files[0];
  
    // this.toast.info('Uploading profile image...');
  
    this.imageUploadService.uploadImage(file, `images/profile/${user.uid}`).pipe(
      concatMap((photoURL) => {
        this.toast.success('Image uploaded successfully');
        return this.usersService.updateUser({ uid: user.uid, photoURL });
      })
    ).subscribe(
      () => {},
      (error) => {
        this.toast.error('There was an error in uploading the image');
        console.error('Error occurred:', error);
      }
    );
  }


  saveProfile() {
    const { uid, ...data } = this.profileForm.value;

    if (!uid) {
      return;
    }

    // this.toast.info('Updating data...');

  this.usersService.updateUser({ uid, ...data }).pipe(
    concatMap(() => {
      this.toast.success('Data has been updated');
      return of(null); // Emit a null value to end the observable chain
    }),
    catchError(error => {
      this.toast.error('There was an error in updating the data');
      console.error('Error occurred:', error);
      return of(error);
    })
  ).subscribe();
  }
}