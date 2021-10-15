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

    it('should have a user after authenticating', (done) => {
        expect.assertions(1);
        authService.login(testCredentials.username, testCredentials.password).subscribe((user: UserModel) => {
            service.getCurrentUser().subscribe((currentUser: UserModel) => {
                expect(currentUser).toEqual(user);
                done();
            });
        }
        );
    });

    it('should have a user after authenticating', (done) => {
        expect.assertions(1);
        authService.logout()
        service.getCurrentUser().subscribe((currentUser: UserModel) => {
            expect(currentUser).toBeNull();
            done();
        });
    });
});
