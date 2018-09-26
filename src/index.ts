import * as Server from './server';

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
  console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
  console.error(`unhandledRejection ${reason}`);
});

async function start() {
  try {
    const server = await Server.init();
    await server.start();
  } catch(err) {
    throw err;
  }
}

start();
