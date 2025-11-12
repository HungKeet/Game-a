// src/app/components/home/home.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpService } from '../../services/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { APIResponse, Game } from '../../models';

// 1. IMPORT THÊM MATBUTTONMODULE
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  public sort: string = 'metacrit';
  public game: Array<Game> = [];
  private currentSearch?: string;

  public page: number = 1;

  public apiResponse?: APIResponse<Game>;

  constructor(
    private httpService: HttpService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('--- Home component ngOnInit CHẠY ---');
    this.activateRoute.params.subscribe((params: Params) => {
      this.currentSearch = params['game-search'];

      this.page = 1;
      this.searchGames(this.sort, this.page, this.currentSearch);
    });
  }

  searchGames(sort: string, page: number, search?: string): void {
    this.httpService
      .getGamelist(sort, page, search) // Gửi 'page' đến service
      .subscribe((gameList: APIResponse<Game>) => {
        this.apiResponse = gameList; // Lưu lại toàn bộ phản hồi
        this.game = gameList.results; // Chỉ hiển thị 'results'
        console.log(this.apiResponse);
      });
  }

  onSortChange(): void {
    this.page = 1; // Reset về trang 1
    this.searchGames(this.sort, this.page, this.currentSearch);
  }

  changePage(action: 'next' | 'prev'): void {
    if (action === 'next' && this.apiResponse?.next) {
      this.page++; // Tăng số trang
    } else if (action === 'prev' && this.apiResponse?.previous) {
      this.page--; // Giảm số trang
    } else {
      return; // Không làm gì nếu không có link next/prev
    }

    this.searchGames(this.sort, this.page, this.currentSearch);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  openGameDetails(id: number): void {
    this.router.navigate(['details', id]);
  }

  getPlatformIcon(platformName: string): string {
    const name = platformName.toLowerCase();
    if (name.includes('pc')) return 'assets/images/platforms/pc.svg';
    if (name.includes('playstation')) return 'assets/images/platforms/playstation.svg';
    if (name.includes('xbox')) return 'assets/images/platforms/xbox.svg';
    if (name.includes('nintendo')) return 'assets/images/platforms/nintendo.svg';
    if (name.includes('mac') || name.includes('ios')) return 'assets/images/platforms/apple.svg';
    if (name.includes('linux')) return 'assets/images/platforms/linux.svg';
    if (name.includes('android')) return 'assets/images/platforms/android.svg';
    return 'assets/images/platforms/default.svg';
  }
}
