import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { IUser } from 'src/interfaces/iuser';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {
  currentUser: IUser | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }
}
