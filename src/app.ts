import Bot from './lib/bot';
import { join } from 'path';

const KBot = new Bot({
  ROOT_PATH: join(__dirname, '..')
});

KBot.run();
