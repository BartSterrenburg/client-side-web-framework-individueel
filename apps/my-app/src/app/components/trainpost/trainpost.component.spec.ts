import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainpostComponent } from './trainpost.component';

describe('TrainpostComponent', () => {
    let component: TrainpostComponent;
    let fixture: ComponentFixture<TrainpostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TrainpostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TrainpostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
