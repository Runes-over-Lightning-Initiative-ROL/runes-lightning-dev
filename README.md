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
- **Go 1.21+** (for Lightning integration via LND)
- **Rust 1.70+** (for Rune parsing and ord client)
- Python 3.10+ (legacy scripting & tooling)
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

# Go dependencies (for Lightning integration)
cd go-lightning
go mod download

# Rust dependencies (for Rune tools)
cd ../rust-rune
cargo build

# Python dependencies (legacy)
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

## 🏗 Programming Stack & Integration Strategy

This project uses a **hybrid multi-language architecture** to bridge the on-chain Rune protocol with Lightning Network capabilities:

### **Go (Primary: Lightning Integration)**
- **Purpose**: Lightning Network integration via LND (Lightning Network Daemon)
- **Rationale**: LND is the dominant Lightning implementation, written in Go
- **Responsibilities**:
  - Lightning channel management with Rune metadata
  - Payment routing with Rune transfer data
  - LND gRPC client integration
  - Custom TLV (Type-Length-Value) encoding for Rune data

### **Rust (Primary: Rune Protocol)**
- **Purpose**: Rune serialization, parsing, and on-chain logic
- **Rationale**: Ordinals protocol and Rune specification are Rust-based
- **Responsibilities**:
  - Rune creation and parsing using ord client
  - Runestone decoding and validation
  - Rune indexing and balance tracking
  - Settlement and burn transaction generation

### **Cross-Layer Integration**
- **Initial Approach**: REST/gRPC APIs between Go and Rust services
- **Future**: Direct message passing and shared memory for performance
- **Data Flow**: Rust parses Runes → Go handles Lightning → Coordinated settlement

## 📦 Project Structure

```
runes-lightning-dev/
├── go-lightning/         # Go-based Lightning integration (LND)
│   ├── go.mod           # Go module dependencies
│   ├── main.go          # Lightning service entry point
│   └── ...              # LND integration code
├── rust-rune/           # Rust-based Rune protocol tools
│   ├── Cargo.toml       # Rust dependencies
│   ├── src/             # Rust source code
│   │   ├── main.rs      # CLI entry point
│   │   ├── rune_parser.rs # Rune parsing logic
│   │   ├── ord_client.rs   # Ord client integration
│   │   └── settlement.rs   # Settlement/burn flows
│   └── ...              # Rust tools and utilities
├── docs/                # Protocol drafts, research notes
├── specs/               # Draft Rune-over-Lightning specifications
├── scripts/             # Helper scripts for testing & automation
├── docker/              # Docker configs for Bitcoin & LN nodes
├── examples/            # Example transactions & settlement flows
├── tools/               # Cross-language integration utilities
├── requirements.txt     # Python dependencies (legacy)
├── package.json         # JS tooling dependencies
└── README.md            # This file
```

## 🚀 Usage Examples

### 1. Create a Rune Asset (Rust)

```bash
cd rust-rune
cargo run -- create TEST 1000000
```

### 2. Parse Rune Data (Rust)

```bash
cd rust-rune
cargo run -- parse <transaction-hash>
```

### 3. Open Rune-aware Lightning Channel (Go)

```bash
cd go-lightning
go run main.go --action=open-channel --peer=alice --rune=TEST --amount=5000
```

### 4. Send Rune over Lightning (Go + Rust)

```bash
# Rust: Parse and validate Rune data
cd rust-rune
cargo run -- parse <rune-tx-hash>

# Go: Send Lightning payment with Rune metadata
cd ../go-lightning
go run main.go --action=send-payment --from=alice --to=bob --amount=100 --rune=TEST
```

### 5. Burn Runes at Channel Close (Rust)

```bash
cd rust-rune
cargo run -- burn --channel-id=12345 --amount=100
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