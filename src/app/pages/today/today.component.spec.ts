import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodayComponent } from './today.component';
import { Address } from 'src/models/address';
import { Observable } from 'rxjs';

describe('TodayComponent', () => {
  let component: TodayComponent;
  let fixture: ComponentFixture<TodayComponent>;
  let input: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodayComponent ],
	  imports: [HttpClientTestingModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search for locations', () => {
	  let address: Address = {
		  name: '11',
		  address_components: {},
		  formatted_address: '',
		  geometry: '',
		  icon: '',
		  id: '',
		  photos: '',
		  place_id: '',
		  validLength: true
	  };

	component.weatherForm.controls['searchQuery'].setValue('Lond');
	expect(component.weatherForm.valid).toBeTruthy();
  });
});
