import {inject, injectable} from 'inversify';
import {TYPES} from '../types.js';
import Player from '../services/player.js';
import FileCacheProvider from '../services/file-cache.js';
import InnertubeProvider from '../services/innertube.js';

@injectable()
export default class {
  private readonly guildPlayers: Map<string, Player>;
  private readonly fileCache: FileCacheProvider;
  private readonly innertubeProvider: InnertubeProvider;

  constructor(@inject(TYPES.FileCache) fileCache: FileCacheProvider, @inject(TYPES.Services.Innertube) innertubeProvider: InnertubeProvider) {
    this.guildPlayers = new Map();
    this.fileCache = fileCache;
    this.innertubeProvider = innertubeProvider;
  }

  get(guildId: string): Player {
    let player = this.guildPlayers.get(guildId);

    if (!player) {
      player = new Player(this.fileCache, this.innertubeProvider, guildId);

      this.guildPlayers.set(guildId, player);
    }

    return player;
  }
}
