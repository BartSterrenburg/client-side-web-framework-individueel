import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrainPostComponent } from './train-post.component';

describe('TrainPostComponent', () => {
    let component: TrainPostComponent;
    let fixture: ComponentFixture<TrainPostComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TrainPostComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TrainPostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
