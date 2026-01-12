import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment.prod';
import { APIResponse, Game } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}
  getGamelist(ordering: string, page: number, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams()
      .set('ordering', ordering)
      .set('page', page.toString())
      .set('page_size', '20');

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }
  getGameDetails(id: string): Observable<Game> {
    const params = new HttpParams();
    return this.http.get<Game>(`${env.BASE_URL}/games/${id}`, {
      params: params,
    });
  }
}
