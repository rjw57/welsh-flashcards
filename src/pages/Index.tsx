import { useState } from "react";
import { Text, Title, Button, Stack, Box, Kbd, Group } from "@mantine/core";
import FlashCard from "../components/FlashCard";
import VOCAB, { PartOfSpeech, getMaxUnit } from "../vocab";
import OptionsPane from "../components/OptionsPane.tsx";
import { DEFAULT_OPTIONS, type Options } from "../constants";
import useKeydownHandler from "../hooks/useKeydownHandler";

const shuffleInPlace = <T,>(array: T[]): T[] => {
  const length = array.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getFilteredVocab = ({ source, partOfSpeech }: Options) =>
  VOCAB.filter((v) => {
    if (!partOfSpeech.noun && v.type === PartOfSpeech.Noun) {
      return false;
    }
    if (!partOfSpeech.verb && v.type === PartOfSpeech.Verb) {
      return false;
    }
    if (!partOfSpeech.adjective && v.type === PartOfSpeech.Adjective) {
      return false;
    }
    if (!partOfSpeech.other && v.type === PartOfSpeech.Other) {
      return false;
    }
    if (source.mode === "upto") {
      if (typeof v.unit === "undefined") {
        return false;
      }
      return v.unit <= source.unit;
    }
    return true;
  });

const Index = () => {
  const [flippedCardIdx, setFlippedCardIdx] = useState<number | null>(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [optionsUpdated, setOptionsUpdated] = useState(false);
  const [vocab, setVocab] = useState(() => shuffleInPlace(getFilteredVocab(options)));
  const [shouldShuffle, setShouldShuffle] = useState(false);
  const [startFlipped, setStartFlipped] = useState(false);

  if (shouldShuffle) {
    setVocab(shuffleInPlace(vocab));
    setShouldShuffle(false);
  }

  const toggleCard = () => {
    setFlippedCardIdx((idx) => (idx === cardIndex ? null : cardIndex));
  };

  const nextCard = () => {
    setCardIndex(Math.min(cardIndex + 1, vocab.length - 1));
  };

  const previousCard = () => {
    setCardIndex(Math.max(cardIndex - 1, 0));
  };

  useKeydownHandler((event) => {
    if (event.key === "ArrowLeft") {
      previousCard();
    }
    if (event.key === "ArrowRight") {
      nextCard();
    }
    if (event.key === " ") {
      toggleCard();
    }
  });

  return (
    <Group justify="center" mt="xl">
      <Stack align="center" maw={380}>
        <Title>Welsh Flashcards</Title>
        <Box w="100%" h={180} pos="relative">
          {[cardIndex - 1, cardIndex, cardIndex + 1].map((idx) => {
            if (idx < 0 || idx >= vocab.length) {
              return undefined;
            }
            const card = vocab[idx];
            const hideSide = idx < cardIndex ? "left" : idx > cardIndex ? "right" : "none";
            return (
              <FlashCard
                key={idx}
                pos="absolute"
                w="100%"
                h="100%"
                card={card}
                hideSide={hideSide}
                onClick={toggleCard}
                flipped={
                  (startFlipped && idx !== flippedCardIdx) ||
                  (!startFlipped && idx === flippedCardIdx)
                }
              />
            );
          })}
        </Box>
        <Text size="sm">
          {cardIndex + 1} / {vocab.length}
        </Text>
        <Text ta="center">
          Use left and right arrow keys to move through deck. Use <Kbd>Space</Kbd> to flip the
          current card.
        </Text>
        <OptionsPane
          options={options}
          onChange={(newOptions) => {
            setOptions(newOptions);
            setOptionsUpdated(true);
          }}
          maxUnit={getMaxUnit() ?? undefined}
        />
        <Button
          fullWidth
          variant="outline"
          disabled={!optionsUpdated}
          onClick={() => {
            const { startFlipped } = options;
            setStartFlipped(startFlipped);
            setVocab(getFilteredVocab(options));
            setOptionsUpdated(false);
            setShouldShuffle(true);
          }}
        >
          Apply and shuffle
        </Button>
      </Stack>
    </Group>
  );
};

export default Index;
