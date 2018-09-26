import { Server as HapiServer } from 'hapi';

export async function init(): Promise<HapiServer> {
  try {
    const port = process.env.PORT;
    const server = new HapiServer({
      debug: false,
      port,
    });
    return server;
  } catch (err) {
    throw err;
  }
}
