import {inject, injectable} from 'inversify';
import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';
import {TYPES} from '../types.js';
import PlayerManager from '../managers/player.js';
import Command, {AnySlashCommandBuilder} from './index.js';

@injectable()
export default class implements Command {
  public readonly slashCommand: AnySlashCommandBuilder = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('clears all songs in queue except currently playing song');

  public requiresVC = true;

  private readonly playerManager: PlayerManager;

  constructor(@inject(TYPES.Managers.Player) playerManager: PlayerManager) {
    this.playerManager = playerManager;
  }

  public async execute(interaction: ChatInputCommandInteraction) {
    this.playerManager.get(interaction.guild!.id).clear();

    await interaction.reply('clearer than a field after a fresh harvest');
  }
}
