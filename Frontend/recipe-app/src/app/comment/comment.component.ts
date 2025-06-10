import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IComment } from 'src/interfaces/icomment';
import { CommentService } from 'src/services/comment.service';
import { AuthService } from 'src/services/auth.service';
import { IUser } from 'src/interfaces/iuser';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit, OnChanges {

  @Input() recipeId: number | null = null;
  comments: IComment[] = [];
  isLoggedIn: boolean = false;
  newComment: string = '';

  constructor(private service: CommentService, private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipeId'] && this.recipeId !== null) {
      this.service.getByRecipeId(this.recipeId).subscribe(data => {
        this.comments = data;
      });
    }
  }

  ngOnInit(): void {
    console.log('CommentComponent initialized with recipeId:', this.recipeId);
    this.isLoggedIn = this.authService.currentUserValue !== null;

    if (this.recipeId !== null) {
      this.service.getByRecipeId(this.recipeId).subscribe(data => {
        this.comments = data;
        console.log("teste de comentario", data);
      });
    }
  }

  submitComment(): void {
    if (!this.newComment.trim()) return;

    const userId = this.authService.currentUserValue?.id;
    if (!userId) {
      console.error('User not logged in. Cannot submit comment.');
      return;
    }

    const comment: Partial<IComment> = {
      comments: this.newComment,
      userId: userId,
      username: this.authService.currentUserValue?.name,
      recipeId: this.recipeId!,
      isActive: true
    };

    // Transform comment object to match API expected property names
    const apiComment = {
      comment: comment.comments,
      userId: comment.userId,
      userName: comment.username,
      recipeId: comment.recipeId,
      isActive: comment.isActive
    };

    this.service.create(apiComment as any).subscribe(() => {
      this.newComment = '';
      this.service.getByRecipeId(this.recipeId!).subscribe(data => {
        this.comments = data;
        console.log(data);
      });
    });
  }
}
