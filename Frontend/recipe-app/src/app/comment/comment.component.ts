import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IComment } from 'src/interfaces/icomment';
import { CommentService } from 'src/services/comment.service';

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

  constructor(private service: CommentService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['recipeId'] && this.recipeId !== null) {
      this.service.getByRecipeId(this.recipeId).subscribe(data => {
        this.comments = data;
      });
    }
  }

  ngOnInit(): void {
    console.log('CommentComponent initialized with recipeId:', this.recipeId);
    // TODO: Replace with actual auth check
    this.isLoggedIn = !!localStorage.getItem('userToken');

    if (this.recipeId !== null) {
      this.service.getByRecipeId(this.recipeId).subscribe(data => {
        this.comments = data;
      });
    }
  }

  submitComment(): void {
    if (!this.newComment.trim()) return;

    // TODO: Replace with actual user id from auth
    const userId = 1;

    const comment: Partial<IComment> = {
      comments: this.newComment,
      userId: userId,
      recipeId: this.recipeId!,
      isActive: true
    };

    this.service.create(comment as IComment).subscribe(() => {
      this.newComment = '';
      this.service.getByRecipeId(this.recipeId!).subscribe(data => {
        this.comments = data;
      });
    });
  }
}
