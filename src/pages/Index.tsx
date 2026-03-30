import { useState, useMemo } from "react";
import { Card, Text, Title, Button, Stack, Box, Divider } from "@mantine/core";
import VOCAB, { PartOfSpeech, Gender, getMaxUnit } from "../vocab";
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

const formatPartOfSpeech = (pos: PartOfSpeech) => {
  switch (pos) {
    case PartOfSpeech.Noun:
      return "Noun";
    case PartOfSpeech.Verb:
      return "Verb";
    case PartOfSpeech.Adjective:
      return "Adjective";
    case PartOfSpeech.Other:
      return "Other";
    default:
      return pos;
  }
};

const formatGender = (gender?: Gender) => {
  if (!gender) return "";
  return gender === Gender.Masculine ? "Masculine" : "Feminine";
};

export const Index = () => {
  const [source, setSource] = useState<SourceSelectorState>({ mode: "all" });
  const [parts, setParts] = useState<PartOfSpeechSelectorState>({
    noun: true,
    verb: true,
    adjective: true,
    other: true,
  });
  const [effectiveState, setEffectiveState] = useState({ source, parts });

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

  return (
    <Stack justify="center" align="center" mt={40}>
      <Title order={1}>Welsh Flashcards</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: 350 }}>
        <Title order={2} mb="md">
          Welsh Word
        </Title>
        {filteredVocab.length > 0 ? (
          <>
            <Text>
              <strong>Welsh:</strong> {filteredVocab[0].welsh}
              {filteredVocab[0].welshPlural && ` (${filteredVocab[0].welshPlural})`}
            </Text>
            <Text>
              <strong>English:</strong> {filteredVocab[0].english}
              {filteredVocab[0].englishPlural && ` (${filteredVocab[0].englishPlural})`}
            </Text>
            <Text>
              <strong>Part of Speech:</strong> {formatPartOfSpeech(filteredVocab[0].type)}
            </Text>
            {filteredVocab[0].gender && (
              <Text>
                <strong>Gender:</strong> {formatGender(filteredVocab[0].gender)}
              </Text>
            )}
            <Text>
              <strong>Source:</strong> {filteredVocab[0].source}
            </Text>
          </>
        ) : (
          <Text>No cards to display.</Text>
        )}
      </Card>
      <Box w={400} mt={32}>
        <Divider my="sm" label="Options" labelPosition="center" />
        <Stack gap="md">
          <SourceSelector state={source} onUpdated={setSource} maxUnit={getMaxUnit() ?? 1} />
          <PartOfSpeechSelector state={parts} onUpdated={setParts} />
          <Button
            mt="md"
            onClick={() => {
              setEffectiveState({ source, parts });
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
