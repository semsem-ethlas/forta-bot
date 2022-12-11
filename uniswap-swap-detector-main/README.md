# Uniswap V3 Swap Agent

## Description

This bot detects Uniswap V3 swaps

## Supported Chains

- Ethereum

## Alerts

Describe each of the type of alerts fired by this agent

- UNISWAP-1
  - Fired when a Uniswap V3 swap occurs
  - Severity is always set to "low"
  - Type is always set to "info"
  - Metadata: sender, recipient, pool, token0, token1, fee 

## Installation

```
npm install
```

## Run

Before run the agent to see how it works with real data, specify the `JSON-RPC` provider in the forta.config.json file. Uncomment the `jsonRpcUrl` property and set it to a websocket provider (e.g. `wss://mainnet.infura.io/ws/v3/`) if deploying in production, els use HTTP provider if testing with jest. Then ready to run the agent.

```
npm start
```

## Test Data

The bot behaviour can be verified with the following transaction:

- 0x72414c7d10d5b31140c6793906c965ddcf2e537caebd85b559a49db10bbd4b0c (make sure to change endpoint to one that has access to archive nodes).
