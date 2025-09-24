# Noir Circuit Compilation

This directory will contain the compiled Noir artifacts when ready to switch from mock mode.

## Setup Instructions

1. Install Noir: `curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash`
2. Compile circuit: `nargo compile --package commit_sum`
3. Generate verification key: `nargo codegen-verifier`
4. Update the ZK mode toggle in settings to use real proofs

## Circuit Files

- `commit_sum.nr` - Main circuit for proving deposit sums
- `Prover.toml` - Input template for proof generation
- `Verifier.toml` - Verification key and parameters

## Integration

The compiled artifacts will be imported into the frontend proof generation system, replacing the mock prover with real zero-knowledge proofs.
