import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

// --- BẮT ĐẦU CÁC IMPORT CẦN THIẾT ---
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Cần cho Angular Material
import { HttpService } from '../../services/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // 'of' dùng để tạo Observable giả
// --- KẾT THÚC CÁC IMPORT ---

// --- TẠO CÁC SERVICE GIẢ (MOCK) ---
// 1. Tạo HttpService giả
const mockHttpService = {
  // Tạo hàm 'getGamelist' giả, trả về một Observable rỗng
  getGamelist: () => of({ results: [] }),
};

// 2. Tạo ActivatedRoute giả
const mockActivatedRoute = {
  // Cung cấp 'params' như một Observable giả
  params: of({ 'game-search': 'test' }),
};
// --- KẾT THÚC MOCK ---

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 'imports' dùng cho Component, Directive, Pipe và Module
      imports: [
        Home, // Component đang test
        FormsModule, // Cho [(ngModel)]
        MatFormFieldModule, // Cho <mat-form-field>
        MatSelectModule, // Cho <mat-select>
        NoopAnimationsModule, // Tắt animation của Material
      ],
      // 'providers' dùng để cung cấp (inject) service
      providers: [
        { provide: HttpService, useValue: mockHttpService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Bây giờ hàm ngOnInit() sẽ chạy an toàn
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
