// This module imports mynediad.json and provides typed access to the vocabulary data.
// Enums are used for part of speech and gender codes.

import mynediadRaw from "./data/mynediad.json";

export enum PartOfSpeech {
  Noun = "noun",
  Verb = "verb",
  Adjective = "adjective",
  Other = "other",
}

export enum Gender {
  Masculine = "masculine",
  Feminine = "feminine",
}

export interface VocabEntry {
  unit?: number;
  source: string;
  type: PartOfSpeech;
  gender?: Gender;
  welsh: string;
  welshPlural?: string;
  english: string;
  englishPlural?: string;
}

// Map code to enum
const mapPartOfSpeech = (code: string): PartOfSpeech => {
  switch (code) {
    case "n":
      return PartOfSpeech.Noun;
    case "v":
      return PartOfSpeech.Verb;
    case "adj":
      return PartOfSpeech.Adjective;
    case "o":
      return PartOfSpeech.Other;
    default:
      throw new Error(`Unknown part of speech code: ${code}`);
  }
};

const mapGender = (code: string): Gender | undefined => {
  switch (code) {
    case "m":
      return Gender.Masculine;
    case "f":
      return Gender.Feminine;
    case "":
      return undefined;
    default:
      throw new Error(`Unknown gender code: ${code}`);
  }
};

const parseUnit = (source: string): number | undefined => {
  const match = /uned\s*(\d+)/i.exec(source);
  if (match) {
    return parseInt(match[1]);
  }
  return undefined;
};

const { fields, data } = mynediadRaw as { fields: string[]; data: (string | undefined)[][] };

export const VOCAB: VocabEntry[] = data.map((row: (string | undefined)[]) => {
  const obj: Record<string, string | undefined> = {};
  fields.forEach((field, i) => {
    obj[field] = row[i];
  });
  return {
    unit: parseUnit(obj.source ?? ""),
    source: obj.source ?? "",
    type: mapPartOfSpeech(obj.type ?? ""),
    gender: mapGender(obj.gender ?? ""),
    welsh: obj.welsh ?? "",
    welshPlural: obj.welshPlural === "" ? undefined : obj.welshPlural,
    english: obj.english ?? "",
    englishPlural: obj.englishPlural === "" ? undefined : obj.englishPlural,
  };
});

export default VOCAB;

// Returns the highest unit number found in vocab sources.
export const getMaxUnit = (): number | null => {
  let max: number | null = null;
  for (const { unit } of VOCAB) {
    if (unit && (max === null || max < unit)) {
      max = unit;
    }
  }
  return max;
};
