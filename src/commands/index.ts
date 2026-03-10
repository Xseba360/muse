import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
  SlashCommandOptionsOnlyBuilder,
  ChatInputCommandInteraction,
  ButtonInteraction,
  AutocompleteInteraction,
} from 'discord.js';

export type AnySlashCommandBuilder =
	| SlashCommandBuilder
	| SlashCommandSubcommandsOnlyBuilder
	| SlashCommandOptionsOnlyBuilder
	| Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;

export default interface Command {
  readonly slashCommand: AnySlashCommandBuilder;
  readonly handledButtonIds?: readonly string[];
  readonly requiresVC?: boolean | ((interaction: ChatInputCommandInteraction) => boolean);
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  handleButtonInteraction?: (interaction: ButtonInteraction) => Promise<void>;
  handleAutocompleteInteraction?: (interaction: AutocompleteInteraction) => Promise<void>;
}
