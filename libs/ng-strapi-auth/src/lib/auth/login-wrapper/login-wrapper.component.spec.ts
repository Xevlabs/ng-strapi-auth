import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../core/services/user/user.service';
import { Spectator, byText, createComponentFactory } from '@ngneat/spectator';
import { LoginWrapperComponent } from './login-wrapper.component';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { UserModel } from '../../core/models';
import { SnackBarService, SnackBarTypeEnum } from '@ng-xevlabs-utils-snackbar';
import { take } from 'rxjs/operators';
import { AuthMaterialModule } from '../../auth-material/auth-material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthOptionModel } from '../../ng-strapi-auth-options';

describe('LoginWrapperComponent', () => {
    let component: LoginWrapperComponent;
    let spectator: Spectator<LoginWrapperComponent>;
    let router: Router;
    let snackBar: SnackBarService;
    let userService: UserService;
    let authService: AuthService;
    let fixture: ComponentFixture<LoginWrapperComponent>;
    let testCredentials = {
        username: 'test_user',
        password: 'testpass'
    }
    let WrongTestCredentials = {
        username: 'test_user_wrong',
        password: 'testpass_wrong'
    }
    let mockOptions: AuthOptionModel = {
        appName: 'Test Mock',
        baseAPIPath: 'http://localhost:1337',
        roleList: [],
    }

    const createComponent = createComponentFactory({
        component: LoginWrapperComponent,
        imports: [
            CommonModule,
            AuthMaterialModule,
            RouterTestingModule.withRoutes([{
                path: 'authentication',
                component: LoginWrapperComponent,
            }]),
            FlexLayoutModule,
            ReactiveFormsModule,
        ],
        declarations: [LoginWrapperComponent],
        providers: [
            {
                provide: 'StrapiAuthLipOptions',
                useValue: mockOptions
            }
        ]
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginWrapperComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginWrapperComponent);
        component = fixture.componentInstance;
        spectator = createComponent();
        router = spectator.inject(Router);
        snackBar = spectator.inject(SnackBarService);
        userService = spectator.inject(UserService);
        fixture.detectChanges();
    });

    afterEach((done) => {
        authService.logout();
        done();
    })

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not have errors on launch and login button should be disabled', () => {
        expect(spectator.query('mat-error')).toBeNull();
        expect(spectator.query('button')!.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('should warn the username is missing and login button should be disabled', () => {
        spectator.blur(spectator.query('[formControlName=username]')!);
        expect(spectator.query(byText('AUTH.ERRORS.USERNAME_REQUIRED'))).not.toBeNull();
        expect(spectator.query('button')!.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('should warn the password is missing and login button should be disabled', () => {
        spectator.blur(spectator.query('[formControlName=password]')!);
        expect(spectator.query(byText('AUTH.ERRORS.PASSWORD_REQUIRED'))).not.toBeNull();
        expect(spectator.query('button')!.attributes.getNamedItem('disabled')).toBeTruthy();
    });

    it('should enable login button, log in and navigate', (done) => {
        const navigateSpy = spyOn(router, 'navigate');
        spectator.typeInElement(testCredentials.username, spectator.query('[formControlName=username]')!);
        spectator.typeInElement(testCredentials.password, spectator.query('[formControlName=password]')!);
        expect(spectator.query('button')!.attributes.getNamedItem('disabled')).not.toBeTruthy();
        spectator.click(spectator.query('button')!);
        expect(navigateSpy).toHaveBeenCalledWith(['/']);
        userService.getCurrentUser().pipe(take(1)).subscribe((user: UserModel) => {
            expect(user).toEqual(authService.currentUser);
            done();
        });
    });

    it('should not log in and should call snackbar with error', (done) => {
        const navigateSpy = spyOn(router, 'navigate');
        const snackBarSpy = spyOn(snackBar, 'showSnackBar');
        spectator.typeInElement(WrongTestCredentials.username, spectator.query('[formControlName=username]')!);
        spectator.typeInElement(WrongTestCredentials.password, spectator.query('[formControlName=password]')!);
        spectator.click(spectator.query('button')!);
        expect(navigateSpy).not.toHaveBeenCalled();
        expect(snackBarSpy).toHaveBeenCalledWith(SnackBarTypeEnum.ERROR, 'AUTH.AUTH/USER-NOT-FOUND');
        userService.getCurrentUser().pipe(take(1)).subscribe((user: UserModel) => {
            expect(user).toBeNull();
            done();
        });
    });
});
