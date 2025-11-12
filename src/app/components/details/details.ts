// Import các module cần thiết của Angular Core và Common
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// Import các module cho routing và service
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../services/http';
import { Game } from '../../models';

// Import thư viện vòng tròn rating (Gauge)
import { GaugeModule } from 'angular-gauge';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, GaugeModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class DetailsComponent implements OnInit {
  public gameRating: number = 0;

  private gameId: string = '';

  public gameDetails?: Game;

  public isBrowser: boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private httpService: HttpService,

    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.gameId = params['id'];

      this.getGameDetails(this.gameId);
    });
  }

  getGameDetails(id: string): void {
    this.httpService.getGameDetails(id).subscribe((details: Game) => {
      this.gameDetails = details;

      this.gameRating = 0;

      if (this.isBrowser) {
        setTimeout(() => {
          this.gameRating = details.metacritic;
        }, 100);
      } else {
        this.gameRating = details.metacritic;
      }
    });
  }

  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 25) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }
}
