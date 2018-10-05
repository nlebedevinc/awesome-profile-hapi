import { Server as HapiServer } from 'hapi';
import * as path from 'path';
import * as inert from 'inert';
import * as appPackage from '../package.json';
import { healthCheckApi } from './api';
import { AppState } from './interfaces';

export async function init(): Promise<HapiServer> {
  try {
    const port = process.env.PORT || 3000;
    const server = new HapiServer({
      debug: false,
      port,
      routes: {
        files: {
          relativeTo: path.join(__dirname, 'public')
        }
      }
    });

    const appState = server.app as AppState;
    appState.name = appPackage.name;
    appState.version = appPackage.version;
    appState.git = {
      url: appPackage.git.url,
    };

    healthCheckApi(server, '/v1/healthcheck');
    await server.register(inert);
    return server;
  } catch (err) {
    throw err;
  }
}
