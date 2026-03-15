-- ============================================================
-- bluzettSystem Seed Data — Next-Gen AI, Web3 & Cyber Security
-- Run via: GET /api/db/seed?secret=seed-db-2024
-- ============================================================

-- ── 1. Categories ───────────────────────────────────────────

INSERT INTO bluzettSystem_categories (name, slug, description, parent_id, image_url, count) VALUES
  ('AI & Machine Learning', 'ai-ml',           'Neural networks and automated intelligence tools', NULL, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', 0),
  ('Cyber Security',       'cyber-security',   'Enterprise-grade protection and privacy suites',    NULL, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', 0),
  ('Web3 & Blockchain',    'web3-blockchain',  'Smart contracts and decentralized app templates',  NULL, 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800', 0),
  ('Multimedia Suite',     'multimedia-suite', 'Professional video, audio, and 3D rendering',      NULL, 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800', 0),
  ('Developer Kits',       'developer-kits',   'Full-stack boilerplates and API frameworks',       NULL, 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800', 0),
  ('Marketing Tech',       'mar-tech',         'Automation and growth hacking digital assets',     NULL, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', 0)
ON CONFLICT (slug) DO NOTHING;

-- Sub-categories
INSERT INTO bluzettSystem_categories (name, slug, description, parent_id, image_url, count)
SELECT 'AI Image Generators', 'ai-images', 'Midjourney and DALL-E prompts/scripts', id, 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400', 0
FROM bluzettSystem_categories WHERE slug = 'ai-ml' ON CONFLICT (slug) DO NOTHING;

INSERT INTO bluzettSystem_categories (name, slug, description, parent_id, image_url, count)
SELECT 'Crypto UI Kits', 'crypto-ui', 'Next.js based wallet and exchange UIs', id, 'https://images.unsplash.com/photo-1621761191319-c6fb62004009?w=400', 0
FROM bluzettSystem_categories WHERE slug = 'web3-blockchain' ON CONFLICT (slug) DO NOTHING;

-- ── 2. Products (30 Items) ──────────────────────────────────

INSERT INTO bluzettSystem_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status) VALUES
-- AI & ML
('NeuroGen Image Pro', 'neurogen-image-pro', 'AI-IMG-01', 'High-speed local AI image generation environment with stable diffusion XL integration.', 'Professional local AI image workstation', 45000, 65000, 45000, 'instock', 999, 56, 4.80, 'publish'),
('GPT Nexus API Gateway', 'gpt-nexus-gateway', 'AI-API-02', 'Middleware to manage multiple LLM providers with built-in token cost tracking.', 'Enterprise AI model management gateway', 95000, 95000, 0, 'instock', 999, 21, 4.90, 'publish'),
('DeepVision Video Upscaler', 'deepvision-upscale', 'AI-VID-03', 'Transform 1080p footage into crisp 4K using temporal neural upscaling.', 'AI-powered professional video upscaler', 32000, 48000, 32000, 'instock', 999, 34, 4.65, 'publish'),
('Sentient Chat UI v4', 'sentient-chat-ui', 'AI-KIT-04', 'Modern React components for building conversational AI apps. Tailwind CSS based.', 'Advanced AI chat interface for web apps', 15000, 25000, 15000, 'instock', 999, 88, 4.70, 'publish'),
('AudioMind Transcription', 'audiomind-pro', 'AI-AUD-05', 'Highly accurate offline transcription software with speaker diarization support.', 'AI-driven speech-to-text studio', 22000, 22000, 0, 'instock', 999, 12, 4.40, 'publish'),

-- Cybersecurity
('Fortress Firewall Script', 'fortress-firewall', 'SEC-FWL-06', 'PHP/NodeJS server-side protection against XSS, SQLi, and Layer 7 DDoS attacks.', 'Industrial strength server-side firewall', 12000, 20000, 12000, 'instock', 999, 41, 4.95, 'publish'),
('CryptoShield VPN Node', 'cryptoshield-vpn', 'SEC-VPN-07', 'Personal WireGuard based VPN setup with obfuscation protocols. One-click deploy.', 'High-privacy personal VPN software', 8500, 15000, 8500, 'instock', 999, 112, 4.80, 'publish'),
('VulnScan Scanner Pro', 'vulnscan-pro', 'SEC-VUL-08', 'Automated web application security scanner for identifying critical vulnerabilities.', 'Professional pen-testing utility suite', 58000, 75000, 58000, 'instock', 999, 19, 4.55, 'publish'),
('KeyMaster Password Vault', 'keymaster-vault', 'SEC-PAS-09', 'Self-hosted, encrypted password management system for distributed teams.', 'Secure team-based credential storage', 24000, 24000, 0, 'instock', 999, 52, 4.70, 'publish'),
('StealthProxy Hub', 'stealth-proxy', 'SEC-PRX-10', 'Rotating residential proxy manager for data scraping and anonymous research.', 'Premium residential proxy management tool', 35000, 50000, 35000, 'instock', 999, 26, 4.45, 'publish'),

-- Web3
('Ethereum DApp Starter', 'eth-dapp-starter', 'W3-ETH-11', 'Complete Hardhat, Ethers.js, and Next.js boilerplate for modern dApp development.', 'Professional Ethereum development kit', 18000, 30000, 18000, 'instock', 999, 45, 4.85, 'publish'),
('NFT Marketplace Core', 'nft-market-core', 'W3-NFT-12', 'Full-featured NFT exchange source code with secondary sales and royalty support.', 'Ready-to-deploy NFT marketplace solution', 145000, 180000, 145000, 'instock', 999, 8, 4.90, 'publish'),
('WalletConnect UI Pro', 'walletconnect-ui', 'W3-WLT-13', 'Premium modal designs for multicore wallet connections (Metamask, Trust, etc).', 'Modern Web3 login UI components', 9500, 15000, 9500, 'instock', 999, 142, 4.75, 'publish'),
('Solana Mint Engine', 'solana-minter', 'W3-SOL-14', 'Optimized Rust-based minter for large scale NFT drops on the Solana network.', 'High-velocity Solana minting application', 42000, 42000, 0, 'instock', 999, 31, 4.60, 'publish'),
('Tokenomics Dashboard', 'tokenomics-dash', 'W3-TKN-15', 'Interactive visualization tool for simulating supply, burn, and staking cycles.', 'Advanced tokenomics analytics platform', 28000, 40000, 28000, 'instock', 999, 14, 4.30, 'publish'),

-- Multimedia
('8K Motion Backgrounds', '8k-motion-pack', 'MUL-VID-16', 'Library of 100 looping abstract 3D backgrounds rendered in stunning 8K.', 'Premium loopable background video assets', 15000, 15000, 0, 'instock', 999, 67, 4.80, 'publish'),
('CinemaLUT Master Pack', 'cinema-lut-pack', 'MUL-LUT-17', '50 professional color grading presets for LOG and Rec.709 footage.', 'Award-winning video color grading LUTS', 22000, 35000, 22000, 'instock', 999, 94, 4.70, 'publish'),
('BeatStack Sound Kit', 'beatstack-drums', 'MUL-AUD-18', '2GB of professional drum hits and melodic loops for Trap and Lo-Fi producers.', 'Ultra high-quality drum and loop samples', 12500, 25000, 12500, 'instock', 999, 121, 4.95, 'publish'),
('3D Isometric Office', '3d-office-kit', 'MUL-3D-19', 'Set of 40 low-poly 3D models for game development and illustration.', 'Isometric 3D model assets for creators', 38000, 55000, 38000, 'instock', 999, 22, 4.50, 'publish'),
('VFX Transition Bundle', 'vfx-transitions', 'MUL-VFX-20', 'Over 1,000 transitions for Premiere Pro and After Effects (Glitch, Zoom, Blur).', 'The ultimate video editor transition pack', 45000, 45000, 0, 'instock', 999, 15, 4.65, 'publish'),

-- Dev Tools
('SaaS Boilerplate Kit', 'saas-boilerplate', 'DEV-SAS-21', 'React, Stripe, and PostgreSQL starter with built-in subscription management.', 'The definitive SaaS application starter kit', 85000, 110000, 85000, 'instock', 999, 39, 4.90, 'publish'),
('Mobile E-shop Template', 'mobile-shop-react', 'DEV-MOB-22', 'PWA-ready React Native ecommerce app with cart and push notifications.', 'Native mobile shop application source', 68000, 68000, 0, 'instock', 999, 21, 4.40, 'publish'),
('API Rate Limiter script', 'api-limiter', 'DEV-API-23', 'Redis-backed rate limiting middleware for preventing API abuse.', 'Middleware for high-traffic API security', 12000, 22000, 12000, 'instock', 999, 8, 4.85, 'publish'),
('Admin Pro Dashboard', 'admin-pro-react', 'DEV-DSH-24', 'Framer Motion powered dashboard with 20+ charts and data visualizations.', 'Stunning React Admin template - v5.0', 32000, 45000, 32000, 'instock', 999, 56, 4.70, 'publish'),
('SQL Query Optimizer', 'sql-optimizer', 'DEV-SQL-25', 'Tool to analyze and optimize PostgreSQL and MySQL query execution times.', 'Performance auditing tool for DBAs', 18000, 18000, 0, 'instock', 999, 12, 4.25, 'publish'),

-- Marketing
('SEO Automator Suite', 'seo-automator', 'MAR-SEO-26', 'Automated keyword research and competitor analysis platform. Self-hosted.', 'Total SEO automation and tracking tool', 55000, 85000, 55000, 'instock', 999, 24, 4.60, 'publish'),
('Email Zap Marketer', 'email-zap-pro', 'MAR-EML-27', 'High-volume cold email automation script with rotating SMTP support.', 'Automated outreach and lead gen software', 38000, 38000, 0, 'instock', 999, 19, 4.45, 'publish'),
('Ad Manager Dashboard', 'ad-manager-ui', 'MAR-ADS-28', 'Single interface to track Facebook, Google, and TikTok ad performance.', 'Unified marketing analytics dashboard', 78000, 120000, 78000, 'instock', 999, 11, 4.90, 'publish'),
('Viral Growth Manual', 'viral-growth-book', 'MAR-BOK-29', 'E-book: The science of building 1M+ communities from zero on social media.', 'The definitive guide to viral social growth', 5000, 15000, 5000, 'instock', 999, 245, 4.95, 'publish'),
('UGC Creator Contract', 'creator-contract', 'MAR-LGL-30', 'Legal templates for brand deals between content creators and agencies.', 'Professional creator legal template pack', 15000, 15000, 0, 'instock', 999, 5, 4.30, 'publish')
ON CONFLICT (slug) DO NOTHING;

-- ── 3. Images (Digital HUD & Code Styles) ───────────────────

INSERT INTO bluzettSystem_product_images (product_id, src, name, alt, position)
SELECT id, 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1000', 'AI Main', 'Artificial Intelligence UI View', 0 FROM bluzettSystem_products WHERE slug = 'neurogen-image-pro' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000', 'Dashboard View', 'Premium Admin Interface', 0 FROM bluzettSystem_products WHERE slug = 'admin-pro-react' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000', 'Cyber Core', 'Security Matrix Shield', 0 FROM bluzettSystem_products WHERE slug = 'fortress-firewall' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1000', 'Web3 Node', 'Blockchain Transaction View', 0 FROM bluzettSystem_products WHERE slug = 'eth-dapp-starter' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000', 'Code Studio', 'Professional Coding Environment', 0 FROM bluzettSystem_products WHERE slug = 'saas-boilerplate'
ON CONFLICT DO NOTHING;

-- ── 4. Attributes (Licensing & Formats) ─────────────────────

INSERT INTO bluzettSystem_product_attributes (product_id, name, options, position)
SELECT id, 'License Type', ARRAY['Personal', 'Commercial', 'Enterprise'], 0 FROM bluzettSystem_products WHERE sku LIKE 'AI-%' OR sku LIKE 'SEC-%' OR sku LIKE 'DEV-%' ON CONFLICT DO NOTHING;

INSERT INTO bluzettSystem_product_attributes (product_id, name, options, position)
SELECT id, 'Codebase', ARRAY['React', 'Next.js', 'Node.js', 'TypeScript'], 1 FROM bluzettSystem_products WHERE slug IN ('sentient-chat-ui', 'eth-dapp-starter', 'saas-boilerplate', 'admin-pro-react') ON CONFLICT DO NOTHING;

-- ── 5. Category Linking ──────────────────────────────────────

INSERT INTO bluzettSystem_product_categories (product_id, category_id)
SELECT p.id, c.id FROM bluzettSystem_products p, bluzettSystem_categories c 
WHERE p.slug = 'neurogen-image-pro' AND c.slug IN ('ai-ml', 'ai-images') UNION ALL
SELECT p.id, c.id FROM bluzettSystem_products p, bluzettSystem_categories c 
WHERE p.slug = 'eth-dapp-starter' AND c.slug IN ('web3-blockchain', 'crypto-ui') UNION ALL
SELECT p.id, c.id FROM bluzettSystem_products p, bluzettSystem_categories c 
WHERE p.slug = 'fortress-firewall' AND c.slug IN ('cyber-security')
ON CONFLICT DO NOTHING;

-- ── 6. Final Sync ───────────────────────────────────────────

UPDATE bluzettSystem_categories c SET count = (SELECT COUNT(*) FROM bluzettSystem_product_categories pc WHERE pc.category_id = c.id);