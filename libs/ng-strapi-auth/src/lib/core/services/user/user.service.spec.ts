import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { UserModel } from '../../models/user.model';

describe('UserService', () => {
    let service: UserService;
    let authService: AuthService;
    let testCredentials = {
        username: 'test_user',
        password: 'testpass'
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'authentication',
                        redirectTo: ''
                    }
                ])
            ],
        });
        authService = TestBed.inject(AuthService);
        service = TestBed.inject(UserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return list of users if permitted', (done) => {
        expect.assertions(1);
        authService.login(testCredentials.username, testCredentials.password).subscribe(() => {
            service.getUsersList().subscribe((users: UserModel[]) => {
                expect(users.length).toBeGreaterThan(0)
                done();
            })
        });
    });

    it('should throw error if not authenticated', (done) => {
        expect.assertions(1);
        authService.logout();
        expect(service.getUsersList).toThrowError();
        done();
    });
});
