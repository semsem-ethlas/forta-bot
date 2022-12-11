# Tornado Cash 1

## Description

This agent detects big values of eth sent into tornado from the same address in a one day timeframe.

## Supported Chains

- Ethereum


## Installation

```
npm install
```

## Run

Before run the agent to see how it works with real data, specify the `JSON-RPC` provider in the forta.config.json file. Uncomment the `jsonRpcUrl` property and set it to a websocket provider (e.g. `wss://mainnet.infura.io/ws/v3/`) if deploying in production, els use HTTP provider if testing with jest. Then ready to run the agent.

```
npm start
```

## Alerts

Describe each of the type of alerts fired by this agent

- NETHFORTA-22
  - Fired when an address send more than 100 eth to Tornado cash in one day.
  - Severity is always set to "high".
  - Type is always set to "suspicious".
  - The transaction sender can be found in the metadata.
