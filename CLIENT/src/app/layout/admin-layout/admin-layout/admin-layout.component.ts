import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Thêm import RouterModule
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SidebarComponent } from 'src/app/shared/components/sidebar/sidebar.component';


@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, SidebarComponent],  // Thêm RouterModule vào imports
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {}
