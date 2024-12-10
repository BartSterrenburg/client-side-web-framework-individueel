import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainpostDetailsComponent } from './trainpost-details.component';

describe('TrainpostDetailsComponent', () => {
    let component: TrainpostDetailsComponent;
    let fixture: ComponentFixture<TrainpostDetailsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TrainpostDetailsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TrainpostDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
