import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
// SỬA DÒNG NÀY: Thêm 'NgForm' vào import
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.scss',
})
export class SearchBar implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Bây giờ TypeScript sẽ hiểu 'NgForm' là gì
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Bạn nên kiểm tra form valid trước khi điều hướng
      this.router.navigate(['search', form.value.search]);
    }
  }
}
