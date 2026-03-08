import {ChatInputCommandInteraction} from 'discord.js';

declare const interaction: ChatInputCommandInteraction;

interface TypedCommandOptions {
  getString(name: string, required: true): string;
  getString(name: string, required?: boolean): string | null;
  getInteger(name: string, required: true): number;
  getInteger(name: string, required?: boolean): number | null;
  getBoolean(name: string, required: true): boolean;
  getBoolean(name: string, required?: boolean): boolean | null;
  getSubcommand(): string;
}

const opts = interaction.options as unknown as TypedCommandOptions;
const _d = opts.getInteger('test');
