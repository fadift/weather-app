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

  it('form should be valid', () => {
	component.weatherForm.controls['searchQuery'].setValue('London');
	const address = <Address>{name: component.weatherForm.get('searchQuery')?.value};
	component.checkAddress(address);
	expect(component.weatherForm.valid).toBeTruthy();
  });

  it('should fetch weather data', () => {
	component.weatherForm.controls['searchQuery'].setValue('London');
	const address = <Address>{name: component.weatherForm.get('searchQuery')?.value};
	fixture.detectChanges();
	const fetchWeatherData = spyOn(TodayComponent.prototype, "fetchWeatherData").and.callThrough();
	component.checkAddress(address);
	fixture.detectChanges();
	expect(fetchWeatherData).toHaveBeenCalledWith(address);
  });

  it('form should be invalid', () => {
	component.weatherForm.controls['searchQuery'].setValue('London is a nice city that needs a visit, London is a nice city that needs visit, London is a nice city that needs visit, London is a nice city that needs visit, London is nice city that needs visit, London is a nice city that needs a visit');
	const address = <Address>{name: component.weatherForm.get('searchQuery')?.value};
	component.checkAddress(address);
	expect(component.weatherForm.valid).toBeFalsy();
  });

  it('should not fetch weather data', () => {
	component.weatherForm.controls['searchQuery'].setValue('London is a nice city that needs a visit, London is a nice city that needs visit, London is a nice city that needs visit, London is a nice city that needs visit, London is nice city that needs visit, London is a nice city that needs a visit');
	const address = <Address>{name: component.weatherForm.get('searchQuery')?.value};
	fixture.detectChanges();
	const fetchWeatherData = spyOn(TodayComponent.prototype, "fetchWeatherData").and.callThrough();
	component.checkAddress(address);
	fixture.detectChanges();
	expect(fetchWeatherData).not.toHaveBeenCalled();
  });

});
