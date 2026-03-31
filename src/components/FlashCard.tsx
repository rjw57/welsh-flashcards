import type { ComponentPropsWithoutRef } from "react";
import { Box, Card, Group, Stack, Text, type BoxComponentProps } from "@mantine/core";
import type { VocabEntry } from "../vocab";
import { Gender, PartOfSpeech } from "../vocab";
import styles from "./FlashCard.module.css";
import hideStyles from "./FlashCardHide.module.css";

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

type HideSide = "none" | "left" | "right";

export interface FlashCardProps {
  card: VocabEntry;
  flipped?: boolean;
  hideSide?: HideSide;
}

export const FlashCard = ({
  card,
  flipped = false,
  hideSide = "none",
  ...props
}: FlashCardProps & BoxComponentProps & ComponentPropsWithoutRef<"div">) => {
  let hideClass = hideStyles.hideNone;
  if (hideSide === "left") hideClass = hideStyles.hideLeft;
  if (hideSide === "right") hideClass = hideStyles.hideRight;

  return (
    <Box className={styles.flipContainer + " " + hideClass} {...props}>
      <Box className={styles.flipper + (flipped ? " " + styles.flipped : "")}>
        <Box className={styles.front}>
          <Card shadow="sm" padding="lg" radius="md" withBorder p={0}>
            <Stack align="stretch" justify="space-between" mih={180} p="xs">
              <Group justify="space-between">
                <Text span c="dimmed" size="sm">
                  {formatPartOfSpeech(card.type)}
                </Text>
              </Group>
              <Stack align="center" justify="center" gap={0}>
                <Text size="xl">{card.english}</Text>
                {card.englishPlural && <Text size="xl">{card.englishPlural}</Text>}
              </Stack>
              <Group justify="space-between">
                <Text span c="dimmed" size="sm">
                  English
                </Text>
                <Text span c="dimmed" size="sm">
                  {card.source}
                </Text>
              </Group>
            </Stack>
          </Card>
        </Box>
        <Box className={styles.back}>
          <Card shadow="sm" padding="lg" radius="md" withBorder p={0}>
            <Stack align="stretch" justify="space-between" mih={180} p="xs">
              <Group justify="space-between">
                <Text span c="dimmed" size="sm">
                  {formatPartOfSpeech(card.type, "cy")}
                </Text>
                <Text span c="dimmed" size="sm">
                  {formatGender(card.gender, "cy")}
                </Text>
              </Group>
              <Stack align="center" justify="center" gap={0}>
                <Text size="xl">{card.welsh}</Text>
                {card.welshPlural && <Text size="xl">{card.welshPlural}</Text>}
              </Stack>
              <Group justify="space-between">
                <Text span c="dimmed" size="sm">
                  Cymraeg
                </Text>
                <Text span c="dimmed" size="sm">
                  {card.source}
                </Text>
              </Group>
            </Stack>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default FlashCard;
