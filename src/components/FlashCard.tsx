import { Text } from "@mantine/core";
import type { VocabEntry } from "../vocab";
import { Gender, PartOfSpeech } from "../vocab";

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
      return String(pos);
  }
};

const formatGender = (gender?: Gender) => {
  if (!gender) return "";
  return gender === Gender.Masculine ? "Masculine" : "Feminine";
};

interface FlashCardProps {
  card: VocabEntry;
}

const FlashCard = ({ card }: FlashCardProps) => (
  <>
    <Text>
      <strong>Welsh:</strong> {card.welsh}
      {card.welshPlural && ` (${card.welshPlural})`}
    </Text>
    <Text>
      <strong>English:</strong> {card.english}
      {card.englishPlural && ` (${card.englishPlural})`}
    </Text>
    <Text>
      <strong>Part of Speech:</strong> {formatPartOfSpeech(card.type)}
    </Text>
    {card.gender && (
      <Text>
        <strong>Gender:</strong> {formatGender(card.gender)}
      </Text>
    )}
    <Text>
      <strong>Source:</strong> {card.source}
    </Text>
  </>
);

export default FlashCard;
