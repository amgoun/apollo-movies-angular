import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { NgToastService } from 'ng-angular-popup';
import { Comment } from '../../generated/graphql';
import { GET_COMMENT, UPDATE_COMMENT, DELETE_COMMENT } from 'src/app/graphql';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-comment',
  templateUrl: './single-comment.component.html',
  styleUrls: ['./single-comment.component.css'],
})
export class SingleCommentComponent {
  comment: Comment | undefined = undefined;
  id: string | number | undefined;

  isLoggedIn: boolean = false;

  contentToUpdate = {
    content: '',
  };

  expand: boolean = false;

  constructor(
    private apollo: Apollo,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.authService.isAuthenticated.subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.apollo
      .watchQuery<Comment>({
        query: GET_COMMENT,
        variables: {
          commentId: this.id,
        },
      })
      .valueChanges.subscribe((response: any) => {
        this.comment = response.data.comment;
      });
  }

  updateComment(updateCommentForm: NgForm) {
    if (this.isLoggedIn === false) {
      this.toast.error({ detail: 'error ', summary: 'please login' });
    }

    const data = {
      content: this.contentToUpdate.content,
    };

    if (updateCommentForm.valid) {
      this.apollo
        .mutate({
          mutation: UPDATE_COMMENT,
          variables: {
            updateCommentId: this.id,
            data,
          },
        })
        .subscribe({
          next: (data: any) => {
            this.toast.success({
              detail: 'Success Message',
              summary: 'comment updated succesful',
            });
          },

          error: (error) => {
            this.toast.error({ detail: 'Error', summary: error });
          },
        });
      updateCommentForm.reset();
    }
  }

  togleMenu() {
    this.expand = !this.expand;
  }

  deleteComment() {
    this.apollo
      .mutate({
        mutation: DELETE_COMMENT,
        variables: {
          deleteCommentId: this.id,
        },
      })
      .subscribe({
        next: (data: any) => {
          this.toast.warning({
            detail: 'warning Message',
            summary: 'comment deleted succesful',
          });
        },

        error: (error) => {
          this.toast.error({ detail: 'Error', summary: error });
        },
      });
    window.setTimeout(function () {
      location.reload();
      window.location.href = '/profile';
    }, 2000);
  }
}
