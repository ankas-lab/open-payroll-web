function blocksToTime(blocks: number): string {
    console.log("blocks to time ", blocks);
  const seconds = blocksToSeconds(blocks);
  console.log("seconds ", seconds);
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;

  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;

  return `${Math.round(seconds / 86400)} days`;
}

function blocksToSeconds(blocks: number): number {
  return blocks * 12; //TODO check if we can get the avg block time from chain
}

export { blocksToTime, blocksToSeconds};
