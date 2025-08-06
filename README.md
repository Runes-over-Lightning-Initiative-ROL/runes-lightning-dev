# Runes over Lightning – Development Environment

⚡ An open‑source sandbox for building, testing, and experimenting with Rune asset integration on the Bitcoin Lightning Network.

## 📜 Project Overview

This project provides a dedicated development environment to explore how Rune assets can be issued, transferred, and settled over Lightning. While Runes currently have no Lightning implementation, this repository aims to:

- Research and define specifications for Rune-over-Lightning transport
- Prototype integration with existing Lightning nodes (Core Lightning, LND)
- Test off-chain settlement flows including burn-at-close, dust-free exits, and redeem-on-burn models
- Provide developers with a repeatable sandbox for experimenting with Lightning + Runes

Our goal is to bridge Runes (Bitcoin-native fungible tokens) with Lightning's instant payment capabilities in a simpler, more robust way than existing token-over-Lightning systems.

## 🎯 Objectives

Design a minimal, open Rune-over-Lightning protocol:

- Metadata encoding for Rune transfers in Lightning onion packets
- Channel funding rules to lock Rune UTXOs securely
- Settlement flows for both on-chain and off-chain finalization

Build and test prototypes using:

- Bitcoin Core + regtest
- Lightning implementations (Core Lightning, LND)
- Rune-aware parsing tools

Document technical findings and publish reference guides.

Encourage collaboration with Bitcoin, Lightning, and Rune dev communities.

## 🛠 Development Environment Setup

### 1. System Requirements

- **OS**: Linux / macOS (Windows WSL2 supported)
- **RAM**: ≥ 8 GB
- **Disk space**: ≥ 10 GB (for Bitcoin & LN data directories)

**Dependencies:**
- Docker & Docker Compose
- Git
- Python 3.10+ (for scripting & tooling)
- Node.js 18+ (optional, for front-end tools)

### 2. Clone the Repository

```bash
git clone https://github.com/Runes-over-Lightning-Initiative-ROL/runes-lightning-dev.git
cd runes-lightning-dev
```

### 3. Install Dependencies

**If using Docker (recommended):**

```bash
docker-compose build
```

**If running locally:**

```bash
# Bitcoin Core
sudo apt install bitcoind bitcoin-cli

# Python dependencies
pip install -r requirements.txt

# Optional JS tools
npm install
```

### 4. Start the Dev Environment

**Option A: Docker (isolated, repeatable)**

```bash
docker-compose up
```

This launches:
- Bitcoin Core (regtest mode)
- Core Lightning node(s)
- Rune parser service
- Lightning gRPC/REST API gateway

**Option B: Manual**

```bash
bitcoind -regtest -daemon
lightningd --network=regtest --lightning-dir=./lightning-data
```

## 📦 Project Structure

```
runes-lightning-dev/
├── docs/                 # Protocol drafts, research notes
├── specs/                # Draft Rune-over-Lightning specifications
├── scripts/              # Helper scripts for testing & automation
├── docker/               # Docker configs for Bitcoin & LN nodes
├── examples/             # Example transactions & settlement flows
├── tools/                # Rune parsing / LN integration utilities
├── requirements.txt      # Python dependencies
├── package.json          # JS tooling dependencies
└── README.md             # This file
```

## 🚀 Usage Examples

### 1. Issue a Rune Asset on Regtest

```bash
python scripts/issue_rune.py --name TEST --supply 1000000
```

### 2. Open a Rune-aware Lightning Channel

```bash
python scripts/open_channel.py --peer alice --rune TEST --amount 5000
```

### 3. Send Rune over Lightning

```bash
python scripts/send_rune_ln.py --from alice --to bob --amount 100
```

### 4. Burn at Channel Close

```bash
python scripts/close_channel_with_burn.py --channel-id 12345
```

## 🤝 Contributing

We welcome contributions from Bitcoin, Lightning, and Rune developers!

**Ways to get involved:**

- **Discuss**: Open GitHub issues for technical discussions and ideas
- **Develop**: Fork the repo, implement features, and submit PRs
- **Test**: Run our sandbox locally, break things, and report findings
- **Document**: Help improve setup guides, diagrams, and protocol specs

### Pull Request Guidelines

Fork and create a feature branch:

```bash
git checkout -b feature/my-feature
```

Commit changes with clear messages.

Open a PR to the main branch describing:
- The feature or fix
- How to test it
- Any protocol implications

## 📚 Resources

- [Bitcoin Core Docs](https://bitcoin.org/en/developer-documentation)
- [Lightning BOLTs](https://github.com/lightning/bolts)
- [Core Lightning Docs](https://docs.corelightning.org/)
- [LND Docs](https://docs.lightning.engineering/)
- [Runes Protocol Overview](https://docs.ordinals.com/runes)

## 📜 License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details. 