// Before running this script, you must start a local MongoDB server.
// See README.md for instructions.
import { decodeTransfersInBlock, filter } from "../common/starknet.js";

// Configure indexer for streaming Starknet Goerli data starting at the specified block.
export const config = {
  streamUrl: "https://goerli.starknet.a5a.ch",
  startingBlock: 800_000,
  network: "starknet",
  filter,
  sinkType: "mongo",
  sinkOptions: {
    database: "example",
    collectionName: "transfers",
  },
  // Restrict invalidate queries to the specified network and symbol.
  // This is useful if you are running multiple indexers on the same database.
  invalidate: {
    network: "starknet-goerli",
    symbol: "ETH",
  },
};

// Transform each block using the function defined in starknet.js.
export default decodeTransfersInBlock;
