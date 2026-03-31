import { Checkbox, Group } from "@mantine/core";

export interface PartOfSpeechSelectorState {
  noun: boolean;
  verb: boolean;
  adjective: boolean;
  other: boolean;
}

export interface PartOfSpeechSelectorProps {
  state: PartOfSpeechSelectorState;
  onUpdated: (state: PartOfSpeechSelectorState) => void;
}

export default function PartOfSpeechSelector({ state, onUpdated }: PartOfSpeechSelectorProps) {
  function update(key: keyof PartOfSpeechSelectorState, value: boolean) {
    const next = { ...state, [key]: value };
    onUpdated(next);
  }

  return (
    <Group justify="flex-start">
      <Checkbox
        label="Nouns"
        checked={state.noun}
        onChange={e => { update("noun", e.currentTarget.checked); }}
      />
      <Checkbox
        label="Verbs"
        checked={state.verb}
        onChange={e => { update("verb", e.currentTarget.checked); }}
      />
      <Checkbox
        label="Adjectives"
        checked={state.adjective}
        onChange={e => { update("adjective", e.currentTarget.checked); }}
      />
      <Checkbox
        label="Other"
        checked={state.other}
        onChange={e => { update("other", e.currentTarget.checked); }}
      />
    </Group>
  );
}
