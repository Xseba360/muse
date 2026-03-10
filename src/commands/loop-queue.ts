import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';
import {TYPES} from '../types.js';
import {inject, injectable} from 'inversify';
import PlayerManager from '../managers/player.js';
import Command, {AnySlashCommandBuilder} from './index.js';
import {STATUS} from '../services/player.js';

@injectable()
export default class implements Command {
  public readonly slashCommand: AnySlashCommandBuilder = new SlashCommandBuilder()
    .setName('loop-queue')
    .setDescription('toggle looping the entire queue');

  public requiresVC = true;

  private readonly playerManager: PlayerManager;

  constructor(@inject(TYPES.Managers.Player) playerManager: PlayerManager) {
    this.playerManager = playerManager;
  }

  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const player = this.playerManager.get(interaction.guild!.id);

    if (player.status === STATUS.IDLE) {
      throw new Error('no songs to loop!');
    }

    if (player.queueSize() < 2) {
      throw new Error('not enough songs to loop a queue!');
    }

    if (player.loopCurrentSong) {
      player.loopCurrentSong = false;
    }

    player.loopCurrentQueue = !player.loopCurrentQueue;

    await interaction.reply((player.loopCurrentQueue ? 'looped queue :)' : 'stopped looping queue :('));
  }
}
