import { ComponentFixture, TestBed } from '@angular/core/testing';
// 1. Sửa tên import
import { DetailsComponent } from './details';

// 2. Import các module cần thiết
import { GaugeModule } from 'angular-gauge';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// 3. (Thói quen tốt) Sửa tên 'describe'
describe('DetailsComponent', () => {
  // 4. Sửa kiểu dữ liệu
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // 5. Thêm các module mà component này cần
      imports: [
        DetailsComponent,
        GaugeModule, // Cần cho <mwl-gauge>
        NoopAnimationsModule, // Cần để tắt animation khi test
      ],
    }).compileComponents(); // 6. Sửa tên component

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
