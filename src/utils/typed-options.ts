import type {AutocompleteInteraction, ChatInputCommandInteraction} from 'discord.js';

// Workaround: the Omit<> wrapper on interaction.options causes the eslint
// typescript parser to resolve method return types as `any`. This interface
// re-declares the method signatures so callers get proper types.
interface TypedCommandOptions {
  getString(name: string, required: true): string;
  getString(name: string, required?: boolean): string | null;
  getInteger(name: string, required: true): number;
  getInteger(name: string, required?: boolean): number | null;
  getBoolean(name: string, required: true): boolean;
  getBoolean(name: string, required?: boolean): boolean | null;
  getSubcommand(required?: boolean): string;
}

export default function typedOptions(interaction: ChatInputCommandInteraction | AutocompleteInteraction): TypedCommandOptions {
  return interaction.options as unknown as TypedCommandOptions;
}
