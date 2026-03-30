import { useState } from "react";
import { Card, Text, Title, Group, Button } from "@mantine/core";
import { vocab, PartOfSpeech, Gender } from "../vocab";
import type { VocabEntry } from "../vocab";

function getRandomVocab(): VocabEntry {
  return vocab[Math.floor(Math.random() * vocab.length)];
}

function formatPartOfSpeech(pos: PartOfSpeech) {
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
}

function formatGender(gender?: Gender) {
  if (!gender) return "";
  return gender === Gender.Masculine ? "Masculine" : "Feminine";
}

export default function IndexPage() {
  const [entry, setEntry] = useState(() => getRandomVocab());

  return (
    <Group justify="center" mt={40}>
      <Card shadow="sm" padding="lg" radius="md" withBorder style={{ minWidth: 350 }}>
        <Title order={2} mb="md">Random Welsh Word</Title>
        <Text>
          <strong>Welsh:</strong> {entry.welsh}
          {entry.welshPlural && ` (${entry.welshPlural})`}
        </Text>
        <Text>
          <strong>English:</strong> {entry.english}
          {entry.englishPlural && ` (${entry.englishPlural})`}
        </Text>
        <Text><strong>Part of Speech:</strong> {formatPartOfSpeech(entry.type)}</Text>
        {entry.gender && (
          <Text><strong>Gender:</strong> {formatGender(entry.gender)}</Text>
        )}
        <Text><strong>Source:</strong> {entry.source}</Text>
        <Button
  mt="md"
  onClick={() => { setEntry(getRandomVocab()); }}
  variant="light"
  color="blue"
>
          Show another random word
        </Button>
      </Card>
    </Group>
  );
}
