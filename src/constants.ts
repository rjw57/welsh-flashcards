import type { SourceSelectorState } from "./components/SourceSelector";
import type { PartOfSpeechSelectorState } from "./components/PartOfSpeechSelector";

export interface Options {
  source: SourceSelectorState;
  partOfSpeech: PartOfSpeechSelectorState;
  startFlipped: boolean;
}

export const DEFAULT_OPTIONS: Options = {
  source: { mode: "all" },
  partOfSpeech: { verb: true, noun: true, adjective: true, other: true },
  startFlipped: false,
};
