import type { ComponentProps } from "react";
import { Card, Text } from "@mantine/core";
import type { VocabEntry } from "../vocab";
import { Gender, PartOfSpeech } from "../vocab";
import styles from "./FlashCard.module.css";

const formatPartOfSpeech = (pos: PartOfSpeech, lang: "en" | "cy" = "en") => {
  if (lang === "cy") {
    switch (pos) {
      case PartOfSpeech.Noun:
        return "Enw";
      case PartOfSpeech.Verb:
        return "Berf";
      case PartOfSpeech.Adjective:
        return "Ansoddair";
      case PartOfSpeech.Other:
        return "Arall";
      default:
        return String(pos);
    }
  }
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

const formatGender = (gender?: Gender, lang: "en" | "cy" = "en") => {
  if (!gender) return "";
  if (lang === "cy") {
    return gender === Gender.Masculine ? "Gwrywaidd" : "Benywaidd";
  }
  return gender === Gender.Masculine ? "Masculine" : "Feminine";
};

interface FlashCardProps extends ComponentProps<"div"> {
  card: VocabEntry;
  flipped?: boolean;
}

const FlashCard = ({ card, flipped, ...divProps }: FlashCardProps) => {
  return (
    <div
      className={styles.flipContainer}
      tabIndex={0}
      role="button"
      style={{ minWidth: 350, outline: "none" }}
      {...divProps}
    >
      <div
        className={styles.flipper + (flipped ? " " + styles.flipped : "")}
        style={{ minHeight: 180 }}
      >
        <div className={styles.front}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ position: "relative", minHeight: 180 }}
          >
            <Text span c="dimmed" size="sm" style={{ position: "absolute", top: 8, left: 12 }}>
              {formatPartOfSpeech(card.type, "cy")}
            </Text>
            <Text span c="dimmed" size="sm" style={{ position: "absolute", top: 8, right: 12 }}>
              {card.gender ? formatGender(card.gender, "cy") : ""}
            </Text>
            <Text style={{ textAlign: "center" }} mt="xl" size="xl">
              {card.welsh}
            </Text>
            {card.welshPlural && (
              <Text style={{ textAlign: "center" }} size="xl">
                {card.welshPlural}
              </Text>
            )}
            <Text span c="dimmed" size="sm" style={{ position: "absolute", bottom: 8, right: 12 }}>
              {card.source}
            </Text>
            <Text span c="dimmed" size="sm" style={{ position: "absolute", bottom: 8, left: 12 }}>
              Cymraeg
            </Text>
          </Card>
        </div>
        <div className={styles.back}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ position: "relative", minHeight: 180 }}
          >
            <Text span c="dimmed" size="sm" style={{ position: "absolute", top: 8, left: 12 }}>
              {formatPartOfSpeech(card.type)}
            </Text>
            <Text span c="dimmed" size="sm" style={{ position: "absolute", top: 8, right: 12 }}>
              {card.gender ? formatGender(card.gender) : ""}
            </Text>
            <Text style={{ textAlign: "center" }} size="xl" mt="xl">
              {card.english}
            </Text>
            {card.englishPlural && (
              <Text style={{ textAlign: "center" }} size="xl">
                {card.englishPlural}
              </Text>
            )}
            <Text span c="dimmed" size="sm" style={{ position: "absolute", bottom: 8, right: 12 }}>
              {card.source}
            </Text>
            <Text span c="dimmed" size="sm" style={{ position: "absolute", bottom: 8, left: 12 }}>
              English
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;
