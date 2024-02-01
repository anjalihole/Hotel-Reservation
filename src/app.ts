import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import 'reflect-metadata';
import { Router } from './startup/router';
import { Logger } from './common/logger';
import { ConfigurationManager } from './config/configuration.manager';
import { Loader } from './startup/loader';
import { DatabaseModelManager } from './database/database.model.manager';
import * as db from './database/database.connector';
import { DbClient } from './database/db.client';

/////////////////////////////////////////////////////////////////////////

export default class Application {
    public _app: express.Application = null;

    private _router: Router = null;

    private static _instance: Application = null;

    //#endregion

    private constructor() {
        this._app = express();
        this._router = new Router(this._app);
    }

    public static instance(): Application {
        return this._instance || (this._instance = new this());
    }

    public app(): express.Application {
        return this._app;
    }

    warmUp = async () => {
        try {
            ConfigurationManager.loadConfigurations();
            await this.setupDatabaseConnection();
            await Loader.init();
            await this.setupMiddlewares();
            await this._router.init();
        } catch (error) {
            Logger.instance().log('An error occurred while warming up.' + error.message);
        }
    };

    setupDatabaseConnection = async () => {
        const sequelize = db.default.sequelize;

        const dbClient = new DbClient();
        await dbClient.createDatabase();

        if (process.env.NODE_ENV === 'test') {
            //Note: This is only for test environment
            //Drop all tables in db
            await dbClient.dropDatabase();
        }

        await DatabaseModelManager.setupAssociations(); //set associations

        await sequelize.sync({ alter: { drop: false } });
    };

    public start = async (): Promise<void> => {
        try {
            await this.warmUp();

            process.on('exit', (code) => {
                Logger.instance().log(`Process exited with code: ${code}`);
            });

            //Start listening
            await this.listen();
        } catch (error) {
            Logger.instance().log('An error occurred while starting reancare-api service.' + error.message);
        }
    };

    private setupMiddlewares = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                this._app.use(express.urlencoded({ extended: true }));
                this._app.use(express.json());
                this._app.use(helmet());
                this._app.use(cors());
                resolve(true);
            } catch (error) {
                reject(error);
            }
        });
    };

    private listen = () => {
        return new Promise((resolve, reject) => {
            try {
                const port = process.env.PORT;
                const server = this._app.listen(port, () => {
                    const serviceName = 'Hotel service api' + '-' + process.env.NODE_ENV;
                    Logger.instance().log(serviceName + ' is up and listening on port ' + process.env.PORT.toString());
                    this._app.emit('server_started');
                });
                module.exports.server = server;
                resolve(this._app);
            } catch (error) {
                reject(error);
            }
        });
    };
}
