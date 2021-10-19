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
});
