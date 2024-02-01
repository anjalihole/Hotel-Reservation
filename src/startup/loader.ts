import 'reflect-metadata';
import { container, DependencyContainer } from 'tsyringe';
import { Authenticator } from '../auth/authenticator';
import { Authorizer } from '../auth/authorizer';
import { Logger } from '../common/logger';
import { Injector } from './injector';

//////////////////////////////////////////////////////////////////////////////////////////////////

export class Loader {
    //#region Variables

    private static _authorizer: Authorizer = null;

    private static _authenticator: Authenticator = null;

    private static _container: DependencyContainer = container;

    //#endregion

    public static get Authenticator() {
        return Loader._authenticator;
    }

    public static get Authorizer() {
        return Loader._authorizer;
    }

    public static get Container() {
        return Loader._container;
    }

    public static init = async (): Promise<boolean> => {
        try {
            //Register injections here...
            Injector.registerInjections(container);

            Loader._authenticator = container.resolve(Authenticator);
            Loader._authorizer = container.resolve(Authorizer);

            return true;
        } catch (error) {
            Logger.instance().log(error.message);
            return false;
        }
    };
}
