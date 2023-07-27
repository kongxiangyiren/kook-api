import { type Client } from 'kook-api';
import plugin from './lib/plugin';
export * from './types/index';
export default class KBot {
  static client: Client;
  static plugin: typeof plugin;
  static ffmpegPath?: string;
}

KBot.plugin = plugin;
