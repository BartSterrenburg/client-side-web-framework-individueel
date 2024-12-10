import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainpostListComponent } from './trainpost-list.component';

describe('TrainpostListComponent', () => {
    let component: TrainpostListComponent;
    let fixture: ComponentFixture<TrainpostListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TrainpostListComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TrainpostListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
