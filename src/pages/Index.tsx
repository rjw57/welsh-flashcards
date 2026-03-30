import { useState, useMemo } from "react";
import { Text, Title, Button, Stack, Box, Divider } from "@mantine/core";
import FlashCard from "../components/FlashCard";
import FlashCardIcons from "../components/FlashCardIcons";
import VOCAB, { PartOfSpeech, getMaxUnit } from "../vocab";
import SourceSelector from "../components/SourceSelector";
import PartOfSpeechSelector from "../components/PartOfSpeechSelector";
import type { SourceSelectorState } from "../components/SourceSelector";
import type { PartOfSpeechSelectorState } from "../components/PartOfSpeechSelector";

const shuffleInPlace = <T,>(array: T[]): T[] => {
  const length = array.length;
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Index = () => {
  const [startFlipped, setStartFlipped] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(startFlipped);
  const [source, setSource] = useState<SourceSelectorState>({ mode: "all" });
  const [parts, setParts] = useState<PartOfSpeechSelectorState>({
    noun: true,
    verb: true,
    adjective: true,
    other: true,
  });
  const [effectiveState, setEffectiveState] = useState({ source, parts });
  const [cardIndex, setCardIndex] = useState(0);

  const filteredVocab = useMemo(
    () =>
      shuffleInPlace(
        VOCAB.filter((v) => {
          const { source, parts } = effectiveState;
          if (!parts.noun && v.type === PartOfSpeech.Noun) {
            return false;
          }
          if (!parts.verb && v.type === PartOfSpeech.Verb) {
            return false;
          }
          if (!parts.adjective && v.type === PartOfSpeech.Adjective) {
            return false;
          }
          if (!parts.other && v.type === PartOfSpeech.Other) {
            return false;
          }
          if (source.mode === "upto") {
            if (typeof v.unit === "undefined") {
              return false;
            }
            return v.unit <= source.unit;
          }
          return true;
        }),
      ),
    [effectiveState],
  );
  const card = cardIndex < filteredVocab.length ? filteredVocab[cardIndex] : null;

  const nextCard = () => {
    setCardIndex(Math.min(cardIndex + 1, filteredVocab.length - 1));
    setCardFlipped(startFlipped);
  };

  const previousCard = () => {
    setCardIndex(Math.max(cardIndex - 1, 0));
    setCardFlipped(startFlipped);
  };

  return (
    <Stack justify="center" align="center" mt={40}>
      <Title order={1}>Welsh Flashcards</Title>
      <FlashCardIcons
        previousEnabled={cardIndex > 0}
        nextEnabled={cardIndex < filteredVocab.length - 1}
        onNext={nextCard}
        onPrevious={previousCard}
      />
      {card ? (
        <FlashCard
          card={card}
          flipped={cardFlipped}
          onClick={() => {
            setCardFlipped((f) => !f);
          }}
        />
      ) : (
        <Text>No cards to display.</Text>
      )}
      {filteredVocab.length > 0 && (
        <Text align="center" size="sm" mt="xs">
          {cardIndex + 1} / {filteredVocab.length}
        </Text>
      )}
      <Box w={400} mt={32}>
        <Divider my="sm" label="Options" labelPosition="center" />
        <Stack gap="md">
          <SourceSelector state={source} onUpdated={setSource} maxUnit={getMaxUnit() ?? 1} />
          <PartOfSpeechSelector state={parts} onUpdated={setParts} />
          <Button
            mt="md"
            onClick={() => {
              setEffectiveState({ source, parts });
              setCardIndex(0);
              setStartFlipped(false);
            }}
            variant="outline"
            color="teal"
          >
            Apply and shuffle
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Index;
