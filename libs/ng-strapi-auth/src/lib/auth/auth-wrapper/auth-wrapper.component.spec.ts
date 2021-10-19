import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginWrapperComponent } from '../login-wrapper/login-wrapper.component';
import { AuthWrapperComponent } from './auth-wrapper.component';
import { AuthMaterialModule } from '../../auth-material/auth-material.module';
import { TranslocoTestingModule } from '@ngneat/transloco';

describe('AuthWrapperComponent', () => {
    let component: AuthWrapperComponent;
    let fixture: ComponentFixture<AuthWrapperComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AuthWrapperComponent],
            imports: [
                AuthMaterialModule,
                TranslocoTestingModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes([{
                    path: '',
                    component: AuthWrapperComponent,
                    children: [
                        {
                            path: '',
                            component: LoginWrapperComponent
                        },
                        {
                            path: '**',
                            redirectTo: 'login',
                        }
                    ]
                }])
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
