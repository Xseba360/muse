import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';
import {TYPES} from '../types.js';
import {inject, injectable} from 'inversify';
import PlayerManager from '../managers/player.js';
import Command, {AnySlashCommandBuilder} from './index.js';
import {buildPlayingMessageEmbed} from '../utils/build-embed.js';

@injectable()
export default class implements Command {
  public readonly slashCommand: AnySlashCommandBuilder = new SlashCommandBuilder()
    .setName('skip')
    .setDescription('skip the next songs')
    .addIntegerOption(option => option
      .setName('number')
      .setDescription('number of songs to skip [default: 1]')
      .setRequired(false));

  public requiresVC = true;

  private readonly playerManager: PlayerManager;

  constructor(@inject(TYPES.Managers.Player) playerManager: PlayerManager) {
    this.playerManager = playerManager;
  }

  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const numToSkip = interaction.options.getInteger('number') ?? 1;

    if (numToSkip < 1) {
      throw new Error('invalid number of songs to skip');
    }

    const player = this.playerManager.get(interaction.guild!.id);

    try {
      await player.forward(numToSkip);
      await interaction.reply({
        content: 'keep \'er movin\'',
        embeds: player.getCurrent() ? [buildPlayingMessageEmbed(player)] : [],
      });
    } catch (_: unknown) {
      throw new Error('no song to skip to');
    }
  }
}
