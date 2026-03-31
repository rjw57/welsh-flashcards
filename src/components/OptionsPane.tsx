import { type Options, DEFAULT_OPTIONS } from "../constants";
import PartOfSpeechSelector from "./PartOfSpeechSelector";
import { Stack } from "@mantine/core";
import SourceSelector from "./SourceSelector";

export interface OptionsPaneProps {
  options?: Options;
  onChange?: (options: Options) => void;
  maxUnit?: number;
}

export const OptionsPane = ({ maxUnit, ...props }: OptionsPaneProps) => {
  const options = { ...DEFAULT_OPTIONS, ...props.options };
  const { onChange } = props;
  const { source, partOfSpeech } = options;

  return (
    <Stack>
      <SourceSelector
        state={source}
        maxUnit={maxUnit}
        onUpdated={(source) => {
          onChange?.({ ...options, source });
        }}
      />
      <PartOfSpeechSelector
        state={partOfSpeech}
        onUpdated={(partOfSpeech) => {
          onChange?.({ ...options, partOfSpeech });
        }}
      />
    </Stack>
  );
};

export default OptionsPane;
