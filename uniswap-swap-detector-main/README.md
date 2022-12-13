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

