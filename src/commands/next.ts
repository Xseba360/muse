import {injectable} from 'inversify';
import Skip from './skip.js';
import {SlashCommandBuilder} from 'discord.js';
import {AnySlashCommandBuilder} from './index.js';

@injectable()
export default class extends Skip {
  public readonly slashCommand: AnySlashCommandBuilder = new SlashCommandBuilder()
    .setName('next')
    .setDescription('skip to the next song');
}
