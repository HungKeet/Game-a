import { Component } from '@angular/core';
import { SearchBar } from './components/search-bar/search-bar';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchBar, RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
})
export class App {}
