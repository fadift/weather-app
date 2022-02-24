import {
	Directive,
	ElementRef,
	Input,
	NgZone,
	Output,
	EventEmitter,
	AfterViewInit,
} from '@angular/core';

declare let google: any;

@Directive({
	selector: '[app-places-autocomplete]',
})
export class PlacesAutocompleteDirective implements AfterViewInit {
	@Input('configs') configs: any;
	@Output() onAddressChange: EventEmitter<any> = new EventEmitter();
	private autocomplete: any;
	private eventListener: any;
	public place: any;
	constructor(private element: ElementRef, private ngZone: NgZone) {}

	ngAfterViewInit(): void {
        this.init();
    }

	init() {
		if (!google || !google.maps) {
			throw new Error('Google maps not installed');
		}

		this.autocomplete = new google.maps.places.Autocomplete(
			this.element.nativeElement,
			this.configs
		);

		if (!this.autocomplete)
		throw new Error("Autocomplete is not initialized");


		if (!this.autocomplete.addListener != null) {
            this.eventListener = this.autocomplete.addListener('place_changed', () => {
                this.handleChangeEvent()
            });
        }

		this.element.nativeElement.addEventListener(
			'keydown',
			(event: KeyboardEvent) => {
				if (!event.key) {
					return;
				}

				let key = event.key.toLowerCase();

				if (
					key == 'enter' &&
					event.target === this.element.nativeElement
				) {
					event.preventDefault();
					event.stopPropagation();
				}
			}
		);

		if (
			window &&
			window.navigator &&
			window.navigator.userAgent &&
			navigator.userAgent.match(/(iPad|iPhone|iPod)/g)
		) {
			setTimeout(() => {
				let containers =
					document.getElementsByClassName('pac-container');

				if (containers) {
					let arr = Array.from(containers);

					if (arr) {
						for (let container of arr) {
							if (!container) continue;

							container.addEventListener('touchend', (e) => {
								e.stopImmediatePropagation();
							});
						}
					}
				}
			}, 500);
		}
	}

	public reset(): void {
		this.autocomplete.setComponentRestrictions(
			this.configs.componentRestrictions
		);
		this.autocomplete.setTypes(this.configs.types);
	}

	private handleChangeEvent(): void {
		this.ngZone.run(() => {
			this.place = this.autocomplete.getPlace();
			if (this.place) {
				this.onAddressChange.emit(this.place);
			}
		});
	}
}
