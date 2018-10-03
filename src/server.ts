import { Server as HapiServer } from 'hapi';
import * as path from 'path';
import * as inert from 'inert';

export async function init(): Promise<HapiServer> {
  try {
    const port = process.env.PORT;
    const server = new HapiServer({
      debug: false,
      port,
      routes: {
        files: {
          relativeTo: path.join(__dirname, 'public')
        }
      }
    });

    await server.register(inert);
    return server;
  } catch (err) {
    throw err;
  }
}
