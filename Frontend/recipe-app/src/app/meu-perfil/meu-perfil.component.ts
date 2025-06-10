import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { IUser } from 'src/interfaces/iuser';
import { UserService } from 'src/services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {
  currentUser: IUser | null = null;
  updateSuccess: boolean = false;
  updateError: string | null = null;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }

  onSubmit(form: NgForm) {
    if (this.currentUser && form.valid) {
      const updatedUser: IUser = {
        ...this.currentUser,
        name: form.value.name,
        email: form.value.email,
        isActive: form.value.isActive
      };
      this.userService.update(this.currentUser.id, updatedUser).subscribe({
        next: () => {
          this.updateSuccess = true;
          this.updateError = null;
          // Optionally update currentUser to reflect changes
          this.currentUser = updatedUser;
          // Also update authService currentUserValue if needed
          // this.authService.currentUserValue = updatedUser;
        },
        error: (err) => {
          this.updateError = 'Erro ao atualizar os dados do usuário.';
          this.updateSuccess = false;
          console.error(err);
        }
      });
    }
  }
}
