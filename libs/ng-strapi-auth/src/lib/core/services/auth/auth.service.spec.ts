import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
    let service: AuthService;
    let testCredentials = {
        username: 'test_user',
        password: 'testpass'
    }
    let WrongTestCredentials = {
        username: 'test_user_wrong',
        password: 'testpass_wrong'
    }

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should authenticate user', (done) => {
        expect.assertions(3);
        expect(service.login(testCredentials.username, testCredentials.password).subscribe((userResponse) => {
            expect(userResponse.username).toEqual(testCredentials.username);
            expect(service.authToken).toBeDefined();
            expect(service.isLoggedIn).toBeTruthy();
            done();
        }));
    });

    it('user authentication should fail and throw an error', (done) => {
        expect.assertions(1);
        expect(service.login(WrongTestCredentials.username, WrongTestCredentials.password)).toThrowError();
        done();
    });

    it('should logout user', (done) => {
        expect.assertions(2);
        service.logout()
        expect(service.authToken).toBeNull()
        expect(service.isLoggedIn).toBeFalsy()
        done();
    });
});
