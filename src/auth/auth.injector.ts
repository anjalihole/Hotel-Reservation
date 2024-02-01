import 'reflect-metadata';
import { DependencyContainer } from 'tsyringe';
import { CustomAuthenticator } from './custom/custom.authenticator';

////////////////////////////////////////////////////////////////////////////////

export class AuthInjector {
    static registerInjections(container: DependencyContainer) {
        container.register('IAuthenticator', CustomAuthenticator);
    }
}
