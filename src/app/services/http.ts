// src/app/services/http.service.ts

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

  /**
   * Sửa hàm này: Thêm tham số 'page: number'
   */
  getGamelist(
    ordering: string,
    page: number, // <-- THÊM THAM SỐ NÀY
    search?: string
  ): Observable<APIResponse<Game>> {
    // Cập nhật 'params'
    let params = new HttpParams()
      .set('ordering', ordering)
      .set('page', page.toString()) // <-- THÊM DÒNG NÀY
      .set('page_size', '20'); // <-- Thêm dòng này để API luôn trả về 20

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params,
    });
  }

  /**
   * Hàm này giữ nguyên
   */
  getGameDetails(id: string): Observable<Game> {
    const params = new HttpParams();
    return this.http.get<Game>(`${env.BASE_URL}/games/${id}`, {
      params: params,
    });
  }
}
