import express from 'express';
import { Logger } from '../common/logger';
import { register as registerApiClientRoutes } from '../api/customer/customer.routes';

////////////////////////////////////////////////////////////////////////////////////

export class Router {
    private _app = null;

    constructor(app: express.Application) {
        this._app = app;
    }

    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                //Handling the base route
                this._app.get('/api/v1/', (req, res) => {
                    res.send({
                        message: `Careplan Service API [Version ${process.env.API_VERSION}]`,
                    });
                });

                registerApiClientRoutes(this._app);
                registerApiClientRoutes(this._app);

                resolve(true);
            } catch (error) {
                Logger.instance().log('Error initializing the router: ' + error.message);
                reject(false);
            }
        });
    };
}
