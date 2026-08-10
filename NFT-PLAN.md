# TONOPTIK Generative NFT Plan

## Concept

Allow visitors to mint the randomly generated WebGL 3D wireframe sculpture displayed on tonoptik.com as an NFT. Each sculpture is unique, generated from a random seed.

```
Visitor lands on tonoptik.com
        ↓
WebGL generates random sculpture (unique seed)
        ↓
Visitor likes it → clicks "Mint this sculpture"
        ↓
NFT is created with that exact sculpture preserved forever
```

---

## Storage Options

The critical question: how to ensure the NFT remains accessible even if tonoptik.com goes offline.

### Option 1: Your Website Only (Not Recommended)

```
NFT points to → tonoptik.com/nft/?seed=12345
```

| Pros | Cons |
|------|------|
| Simplest | NFT breaks if site goes down |
| No storage costs | Centralized, defeats NFT purpose |

**Verdict:** Avoid. Many NFTs have already "died" this way.

---

### Option 2: IPFS with Pinning Service

Decentralized storage where files remain available as long as someone "pins" them.

```
Files uploaded to IPFS → CID: ipfs://Qm...
NFT metadata points to IPFS URLs
```

**Pinning Services:**

| Service | Free Tier | Paid | Notes |
|---------|-----------|------|-------|
| nft.storage | 31 GB | Free (for now) | Built for NFTs |
| Pinata | 1 GB | $20/mo for 50GB | Popular, reliable |
| Filebase | 5 GB | $6/mo | S3-compatible |

| Pros | Cons |
|------|------|
| Decentralized | Depends on pinning service staying alive |
| Industry standard | Need to maintain pinning subscription |
| Free options available | Files can disappear if unpinned |

**Verdict:** Good option, but requires ongoing maintenance.

---

### Option 3: Arweave (Recommended)

Pay once, stored forever (200+ year model). Truly permanent storage.

```
Files uploaded to Arweave → URL: ar://abc123 or arweave.net/abc123
```

**Upload Services:**

| Service | Type | Notes |
|---------|------|-------|
| Akord | Web UI | Drag & drop, simple |
| ArDrive | Web/Desktop | Like Google Drive |
| Bundlr | Developer SDK | Programmatic uploads |

**Cost:** ~$0.01-0.05 per MB (very cheap)

| Pros | Cons |
|------|------|
| Pay once, permanent | Small upfront cost |
| No maintenance needed | Less familiar than IPFS |
| Used by Art Blocks, major projects | |
| Files accessible via web browser | |

**Verdict:** Best option for long-term preservation.

---

### Option 4: On-Chain (For Small Files Only)

Store data directly in the blockchain.

| Pros | Cons |
|------|------|
| Maximum permanence | Very expensive for large files |
| Lives as long as Ethereum | ~24KB limit per transaction |
| | Only practical for SVG, tiny code |

**Verdict:** Not suitable for 3D/WebGL (files too large).

---

## What to Store

### Recommended: Self-Contained HTML File

A single HTML file containing all code needed to render the sculpture:

```html
<!DOCTYPE html>
<html>
<head>
  <title>TONOPTIK Sculpture #847291</title>
  <style>body { margin: 0; background: #000; }</style>
</head>
<body>
  <script src="https://unpkg.com/three@0.160.0/build/three.min.js"></script>
  <script>
    const SEED = 847291;
    // Full generation code here
    // Creates the exact same sculpture every time
  </script>
</body>
</html>
```

**File size:** ~50-100 KB (or ~500 KB with inline Three.js)

**Benefits:**
- Opens directly in any browser via Arweave URL
- Can be downloaded and run offline forever
- Source code visible (transparency)
- Interactive 3D, not just a static image

### Additional Files (Optional)

| File | Purpose | Size |
|------|---------|------|
| PNG preview | Display on OpenSea, wallets | ~50 KB |
| MP4 video | Animated preview for platforms | ~1 MB |
| GLB model | Open in Blender, 3D viewers | ~100-500 KB |

---

## NFT Metadata Structure

```json
{
  "name": "TONOPTIK Sculpture #847291",
  "description": "Generative wireframe sculpture. Unique seed: 847291. Interactive 3D artwork.",
  "image": "ar://[preview-image-id]",
  "animation_url": "ar://[interactive-html-id]",
  "external_url": "https://tonoptik.com/nft/?seed=847291",
  "attributes": [
    { "trait_type": "Seed", "value": "847291" },
    { "trait_type": "Artist", "value": "TONOPTIK" },
    { "trait_type": "Type", "value": "Generative Wireframe" }
  ],
  "properties": {
    "files": [
      {
        "uri": "ar://[html-id]",
        "type": "text/html"
      },
      {
        "uri": "ar://[glb-id]",
        "type": "model/gltf-binary"
      }
    ]
  }
}
```

---

## Blockchain / Platform Options

### Option A: Zora Network (Recommended for Art)

L2 network built specifically for creators.

| Aspect | Details |
|--------|---------|
| Gas cost per mint | ~$0.01-0.05 |
| Platform fee | 0% |
| Creator rewards | Earn on every mint |
| OpenSea support | Limited |

**Best for:** Art-focused community, open editions, low costs

### Option B: Polygon via Manifold

Established L2 with full OpenSea integration.

| Aspect | Details |
|--------|---------|
| Gas cost per mint | ~$0.01-0.10 |
| Contract deployment | ~$0.50-5 |
| OpenSea support | Full |
| Manifold support | Full |

**Best for:** Maximum audience reach, traditional NFT collectors

### Option C: Base

Coinbase's L2, growing ecosystem.

| Aspect | Details |
|--------|---------|
| Gas cost per mint | ~$0.01-0.20 |
| OpenSea support | Full |
| Audience | Growing, good UX |

**Best for:** Balance of reach and low costs

### Comparison

| Criteria | Zora | Polygon | Base |
|----------|------|---------|------|
| Cost | Lowest | Low | Low |
| Art community | Best | Good | Growing |
| OpenSea integration | Limited | Full | Full |
| Creator rewards | Built-in | No | No |
| Manifold support | No | Yes | Yes |

---

## Minting Models

### Model A: Collector Mints (Recommended)

You upload the work, collector pays to mint.

```
You upload → Collector clicks "Mint" → Collector pays gas → NFT created
```

- Zero upfront cost for you
- Risk-free (unsold = no cost)
- Collector pays gas + your price

### Model B: You Mint First

Traditional model where you create NFTs upfront.

```
You mint → Pay gas → List for sale → Collector buys
```

- You pay gas for each NFT
- Risk if unsold
- More control over exact supply

---

## Technical Implementation Plan

### Phase 1: Seed-Based Generation

Modify `hero-wireframe.js` to use deterministic random generation:

```javascript
// Current: Math.random() - different every time
// New: seededRandom(seed) - reproducible from seed

let currentSeed = Math.floor(Math.random() * 1000000);

function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
```

Display current seed on page: `#847291`

### Phase 2: Self-Contained HTML Template

Create `nft-template.html`:
- Embeds Three.js (or links to permanent CDN)
- Contains full generation code
- Accepts seed as parameter or hardcoded
- Works standalone in any browser

### Phase 3: Export Functions

Add to sculpture generator:
- `exportToGLB()` - 3D model file
- `renderPreview()` - PNG image
- `renderVideo()` - MP4 rotation animation (optional)

### Phase 4: Arweave Integration

- Bundlr SDK for uploads
- Upload HTML, preview, GLB on mint
- Return permanent Arweave URLs

### Phase 5: Mint Button & Wallet Connection

Add to tonoptik.com:
- "Mint this sculpture" button
- Wallet connection (RainbowKit, ConnectKit, etc.)
- Zora SDK or thirdweb for minting

### Phase 6: NFT Page

Create `/nft/?seed=X` page:
- Renders specific sculpture by seed
- Displays mint status
- Links to OpenSea/Zora if minted

---

## Cost Breakdown

### Per-NFT Costs (Paid by Collector or Creator)

| Component | Arweave | Zora Gas | Total |
|-----------|---------|----------|-------|
| HTML file (~100 KB) | $0.01 | - | $0.01 |
| PNG preview (~50 KB) | $0.005 | - | $0.005 |
| GLB model (~200 KB) | $0.02 | - | $0.02 |
| Metadata JSON | $0.001 | - | $0.001 |
| Mint transaction | - | $0.05 | $0.05 |
| **Total** | ~$0.04 | ~$0.05 | **~$0.09** |

### One-Time Costs

| Item | Cost | Notes |
|------|------|-------|
| Smart contract deployment | $1-10 | Depends on network |
| Domain/hosting | $0 | Already have tonoptik.com |

---

## Revenue Model Options

### Option 1: Fixed Price
- Set price per mint (e.g., 0.01 ETH ≈ $35)
- Simple, predictable

### Option 2: Open Edition + Time Limit
- Low price (0.001 ETH ≈ $3.50)
- Available for 24-72 hours
- Unlimited mints during window
- Creates urgency

### Option 3: Limited Edition
- Fixed supply (e.g., 100 sculptures)
- Higher price point
- Scarcity value

### Option 4: Free + Creator Rewards (Zora)
- Free to mint (collector pays only gas)
- You earn ~0.000333 ETH per mint from Zora protocol
- Maximizes distribution

---

## Recommended Approach

For TONOPTIK, the suggested configuration:

| Aspect | Choice | Reason |
|--------|--------|--------|
| Storage | Arweave | Permanent, no maintenance |
| File format | Self-contained HTML + PNG preview | Interactive + compatible |
| Network | Zora | Art-focused, 0% fees, creator rewards |
| Model | Collector mints | Zero risk, no upfront cost |
| Pricing | Open edition, ~0.005 ETH | Accessible, volume-based |

---

## Next Steps

1. [ ] Implement seed-based generation in `hero-wireframe.js`
2. [ ] Create self-contained HTML template
3. [ ] Add GLB export functionality
4. [ ] Set up Arweave uploads (Bundlr)
5. [ ] Deploy contract on Zora
6. [ ] Add mint button to tonoptik.com
7. [ ] Test end-to-end flow
8. [ ] Launch

---

## Resources

- [Arweave](https://arweave.org) - Permanent storage
- [Bundlr](https://bundlr.network) - Arweave uploads
- [Zora Docs](https://docs.zora.co) - Minting protocol
- [thirdweb](https://thirdweb.com) - NFT infrastructure
- [Three.js GLTFExporter](https://threejs.org/docs/#examples/en/exporters/GLTFExporter) - 3D export
