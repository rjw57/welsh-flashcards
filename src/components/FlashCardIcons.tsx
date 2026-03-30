import { Group, ActionIcon } from "@mantine/core";
import { IconArrowLeft, IconArrowsShuffle2, IconArrowRight } from "@tabler/icons-react";

export interface FlashCardIconsProps {
  previousEnabled?: boolean;
  onPrevious?: () => void;
  nextEnabled?: boolean;
  onNext?: () => void;
  onShuffle?: () => void;
}

export const FlashCardIcons = (props: FlashCardIconsProps) => {
  const { previousEnabled, onPrevious, nextEnabled, onNext, onShuffle } = {
    previousEnabled: false,
    nextEnabled: false,
    ...props,
  };
  return (
    <Group justify="center" mt="md">
      <ActionIcon
        variant="subtle"
        disabled={!previousEnabled}
        aria-label="Previous card"
        onClick={onPrevious}
      >
        <IconArrowLeft />
      </ActionIcon>
      <ActionIcon variant="subtle" aria-label="Shuffle cards" onClick={onShuffle}>
        <IconArrowsShuffle2 />
      </ActionIcon>
      <ActionIcon variant="subtle" disabled={!nextEnabled} aria-label="Next card" onClick={onNext}>
        <IconArrowRight />
      </ActionIcon>
    </Group>
  );
};

export default FlashCardIcons;
