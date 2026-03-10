import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';
import {TYPES} from '../types.js';
import {inject, injectable} from 'inversify';
import PlayerManager from '../managers/player.js';
import Command, {AnySlashCommandBuilder} from './index.js';

@injectable()
export default class implements Command {
  public readonly slashCommand: AnySlashCommandBuilder = new SlashCommandBuilder()
    .setName('disconnect')
    .setDescription('pause and disconnect Muse');

  public requiresVC = true;

  private readonly playerManager: PlayerManager;

  constructor(@inject(TYPES.Managers.Player) playerManager: PlayerManager) {
    this.playerManager = playerManager;
  }

  public async execute(interaction: ChatInputCommandInteraction) {
    const player = this.playerManager.get(interaction.guild!.id);

    if (!player.voiceConnection) {
      throw new Error('not connected');
    }

    player.disconnect();

    await interaction.reply('u betcha, disconnected');
  }
}
