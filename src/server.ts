import { Server as HapiServer } from 'hapi';
import * as path from 'path';
import * as inert from 'inert';
import * as appPackage from '../package.json';
import { healthCheckApi, projectsApi } from './api';
import { AppState, AppServices } from './interfaces';

export async function init(services: AppServices): Promise<HapiServer> {
  try {
    const port = process.env.PORT || 3000;
    const server = new HapiServer({
      debug: false,
      port,
      routes: {
        files: {
          relativeTo: path.join(process.cwd(), 'public')
        }
      }
    });

    const appState = server.app as AppState;
    appState.services = services;
    appState.name = appPackage.name;
    appState.version = appPackage.version;
    appState.git = {
      url: appPackage.git.url,
    };

    healthCheckApi(server, '/v1/healthcheck');
    projectsApi(server, '/v1/projects');
    await server.register(inert);
    return server;
  } catch (err) {
    throw err;
  }
}
