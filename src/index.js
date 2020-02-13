
import Client from './client';
import Core from './core/core.worker';

const worker = new Core();

Client(worker);
