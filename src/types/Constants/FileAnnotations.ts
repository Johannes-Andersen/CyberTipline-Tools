/**
 * Tags used to describe a file.
 *
 * @see https://report.cybertip.org/ispws/documentation/index.html#file-annotations
 */
export enum FileAnnotations {
  /** The file is depicting anime, drawing, cartoon, virtual or hentai. */
  AnimeDrawingVirtualHentai = 'animeDrawingVirtualHentai',
  /** The file is being shared/posted out of mimicry or other seemingly non-malicious intent. */
  PotentialMeme = 'potentialMeme',
  /** The file is circulating rapidly from one user to another. */
  Viral = 'viral',
  /** The file contains content that is believed to be self-produced */
  PossibleSelfProduction = 'possibleSelfProduction',
  /** The file depicts an intentional act of causing physical injury or trauma to a person. */
  PhysicalHarm = 'physicalHarm',
  /** The file depicts graphic violence, including but not limited to acts of brutality or detailed or vivid gruesomeness. */
  ViolenceGore = 'violenceGore',
  /** The file involves an animal. */
  Bestiality = 'bestiality',
  /** The file depicts content that was streamed live at the time it was uploaded. */
  LiveStreaming = 'liveStreaming',
  /** The file depicts an infant. */
  Infant = 'infant',
  /** The file contains content that is believed to be Generative Artificial Intelligence. */
  GenerativeAI = 'generativeAi',
}
