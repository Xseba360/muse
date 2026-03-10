import {ChatInputCommandInteraction, SlashCommandBuilder} from 'discord.js';
import {TYPES} from '../types.js';
import {inject, injectable} from 'inversify';
import PlayerManager from '../managers/player.js';
import Command, {AnySlashCommandBuilder} from './index.js';
import {buildPlayingMessageEmbed} from '../utils/build-embed.js';

@injectable()
export default class implements Command {
  public readonly slashCommand: AnySlashCommandBuilder = new SlashCommandBuilder()
    .setName('now-playing')
    .setDescription('shows the currently played song');

  private readonly playerManager: PlayerManager;

  constructor(@inject(TYPES.Managers.Player) playerManager: PlayerManager) {
    this.playerManager = playerManager;
  }

  public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const player = this.playerManager.get(interaction.guild!.id);

    if (!player.getCurrent()) {
      throw new Error('nothing is currently playing');
    }

    await interaction.reply({
      embeds: [buildPlayingMessageEmbed(player)],
    });
  }
}
