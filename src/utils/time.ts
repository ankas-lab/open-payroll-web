function blocksToTime(blocks: number): string {
  const seconds = blocksToSeconds(blocks);

  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;

  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;

  return `${Math.round(seconds / 86400)} days`;
}

function blocksToSeconds(blocks: number): number {
  return blocks * 12; //TODO check if we can get the avg block time from chain
}

export { blocksToTime, blocksToSeconds };
