-- ============================================================
-- Nestora Seed Data — Premium Digital Goods & Software
-- Run via: GET /api/db/seed?secret=seed-db-2024
-- ============================================================

-- ── 1. Categories ───────────────────────────────────────────

-- Parent categories
INSERT INTO bluzett_categories (name, slug, description, parent_id, image_url, count) VALUES
  ('Software & Apps',     'software-apps',      'Pro-grade applications and utility software',      NULL, 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', 0),
  ('Design Assets',       'design-assets',      'Premium UI kits, fonts, and graphic templates',    NULL, 'https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?w=800', 0),
  ('Development Tools',   'dev-tools',          'API kits, scripts, and coding frameworks',         NULL, 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800', 0),
  ('Digital Courses',     'digital-courses',    'Expert-led video masterclasses and bootcamps',     NULL, 'https://images.unsplash.com/photo-1501504905992-1c0e3a652a95?w=800', 0),
  ('Subscriptions',       'subscriptions',      'Cloud storage and monthly digital services',        NULL, 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800', 0),
  ('Content Creator Kit', 'content-creator',    'LUTS, sound effects, and video overlays',          NULL, 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800', 0)
ON CONFLICT (slug) DO NOTHING;

-- Sub-categories
INSERT INTO bluzett_categories (name, slug, description, parent_id, image_url, count)
SELECT 'UI Kits & Templates', 'ui-templates', 'Figma and Webflow design systems', id, 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400', 0
FROM bluzett_categories WHERE slug = 'design-assets' ON CONFLICT (slug) DO NOTHING;

INSERT INTO bluzett_categories (name, slug, description, parent_id, image_url, count)
SELECT 'Programming Courses', 'code-courses', 'Learn React, Node, and Python', id, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400', 0
FROM bluzett_categories WHERE slug = 'digital-courses' ON CONFLICT (slug) DO NOTHING;

-- ── 2. Products (30 Items) ──────────────────────────────────

INSERT INTO bluzett_products (name, slug, sku, description, short_description, price, regular_price, sale_price, stock_status, stock_quantity, rating_count, average_rating, status) VALUES
-- Software
('Nestora CRM Pro', 'nestora-crm-pro', 'SFT-CRM-01', 'Cloud-based customer relationship management tool with automated lead tracking and high-velocity sales pipelines.', 'Complete SAAS CRM for growing sales teams', 125000, 150000, 125000, 'instock', 999, 45, 4.80, 'publish'),
('Cyber Shield VPN', 'cyber-shield-vpn', 'SFT-VPN-02', 'Secure your digital presence with 256-bit encryption. Access servers in 90+ countries with no speed throttling.', 'Ultimate privacy software for anonymous browsing', 15000, 15000, 0, 'instock', 999, 112, 4.75, 'publish'),
('Logo Designer AI', 'logo-designer-ai', 'SFT-LOG-03', 'Generate high-fidelity vector logos in seconds using our custom neural-network design engine.', 'AI-powered vector logo creator application', 28000, 45000, 28000, 'instock', 999, 89, 4.60, 'publish'),
('Code Editor Suite', 'code-editor-suite', 'SFT-COD-04', 'A lightweight, extensible code editor with integrated git support and AI auto-complete functionality.', 'Professional grade developer text editor', 42000, 42000, 0, 'instock', 999, 67, 4.90, 'publish'),
('TaskFlow Manager', 'taskflow-manager', 'SFT-TFM-05', 'Synchronize your team projects with advanced Kanban boards and resource allocation trackers.', 'Project management tool for agile teams', 35000, 50000, 35000, 'instock', 999, 34, 4.55, 'publish'),

-- Design Assets
('Ultra UI Design System', 'ultra-ui-kit', 'AST-UI-06', 'Massive Figma library with 500+ components, 50 pages, and full dark-mode support.', 'Enterprise-grade Figma UI Design System', 55000, 75000, 55000, 'instock', 999, 21, 4.95, 'publish'),
('Cyber Font Bundle', 'cyber-fonts', 'AST-FNT-07', '12 professional geometric fonts designed for tech brands and gaming interfaces.', 'Modern typography bundle for tech companies', 18000, 25000, 18000, 'instock', 999, 12, 4.40, 'publish'),
('3D Abstract Render Pack', '3d-render-pack', 'AST-3DR-08', '50 high-resolution 4K transparent PNG renders for websites and advertising banners.', 'Stunning 3D abstract shapes for modern design', 12000, 12000, 0, 'instock', 999, 42, 4.70, 'publish'),
('Social Media Kit v2', 'social-media-kit', 'AST-SMK-09', 'Editable Canva and Photoshop templates for Instagram, LinkedIn, and Twitter.', '200+ ready-to-use social media templates', 9500, 15000, 9500, 'instock', 999, 156, 4.85, 'publish'),
('Iconic SVG Library', 'iconic-svg', 'AST-ICO-10', 'Minimalist, pixel-perfect icon set available in SVG, Figma, and React formats.', '3,000+ minimalist stroke and solid icons', 22000, 32000, 22000, 'instock', 999, 74, 4.65, 'publish'),

-- Courses
('React Mastery Bootcamp', 'react-mastery-course', 'CRS-REA-11', 'Go from zero to pro in React. Covers Hooks, Context API, and advanced Next.js App Router patterns.', 'Comprehensive React.js video course', 85000, 120000, 85000, 'instock', 999, 210, 5.00, 'publish'),
('Python for Data Science', 'python-data-course', 'CRS-PYT-12', 'Learn Pandas, NumPy, and Matplotlib. Includes 5 real-world data analysis projects.', 'Practical data science with Python', 65000, 65000, 0, 'instock', 999, 48, 4.80, 'publish'),
('Digital Marketing Bible', 'digital-marketing-course', 'CRS-MKT-13', 'Master SEO, Google Ads, and Facebook Marketing with this 40-hour masterclass.', 'Complete digital marketing certification', 45000, 55000, 45000, 'instock', 999, 31, 4.45, 'publish'),
('Advanced UX Strategy', 'ux-strategy-course', 'CRS-UXD-14', 'Learn user research methodologies and product prototyping for large scale systems.', 'Expert-led UX design and research course', 78000, 85000, 78000, 'instock', 999, 19, 4.60, 'publish'),
('Full-Stack Web Dev Kit', 'fullstack-dev-kit', 'CRS-FSD-15', '100 days of code covering HTML, CSS, JS, Node, and SQL. Build 10 full applications.', 'Complete career-ready web development path', 120000, 120000, 0, 'instock', 999, 56, 4.90, 'publish'),

-- Subscriptions
('Cloud Drive Plus 2TB', 'cloud-drive-2tb', 'SUB-CLD-16', 'Secure encrypted cloud storage with automatic file sync and versioning history.', '2TB secure cloud storage (1 Year)', 24000, 24000, 0, 'instock', 999, 32, 4.30, 'publish'),
('Web Hosting Pro (Annual)', 'web-hosting-pro', 'SUB-HST-17', 'Unmetered bandwidth, free SSL certificate, and one-click WordPress install.', 'Business-grade annual web hosting plan', 48000, 60000, 48000, 'instock', 999, 14, 4.60, 'publish'),
('AI Stock Image API', 'ai-image-api', 'SUB-API-18', 'Programmatic access to millions of AI-generated stock photos. High-speed JSON delivery.', 'Subscription-based AI stock photo API', 95000, 110000, 95000, 'instock', 999, 8, 4.50, 'publish'),
('Music Stream Unlimited', 'music-stream-unlimited', 'SUB-MSC-19', 'Ad-free high-fidelity music streaming. Download tracks for offline listening.', 'Monthly premium music subscription', 3500, 3500, 0, 'instock', 999, 245, 4.70, 'publish'),
('News Hub Premium', 'news-hub-premium', 'SUB-NWS-20', 'Unrestricted access to global market reports and institutional financial news.', 'Annual premium financial news access', 12000, 12000, 0, 'instock', 999, 12, 4.10, 'publish'),

-- Developer Tools
('API Security Firewall', 'api-firewall', 'DEV-FIR-21', 'A plug-and-play middleware script to stop SQL injection and brute-force attacks.', 'Middleware for secure REST API endpoints', 68000, 88000, 68000, 'instock', 999, 5, 4.95, 'publish'),
('Node.js Boilerplate Kit', 'node-boilerplate', 'DEV-BLP-22', 'Production ready Express, Prisma, and JWT starter kit with Docker support.', 'Clean-code Node.js application starter kit', 15000, 15000, 0, 'instock', 999, 31, 4.85, 'publish'),
('React Admin Dashboard', 'react-admin-dashboard', 'DEV-DSH-23', 'A stunning dashboard template built with Tailwind CSS and Framer Motion.', 'Pro React Admin Template - Dark Mode', 32000, 48000, 32000, 'instock', 999, 41, 4.70, 'publish'),
('Flutter E-Commerce App', 'flutter-shop-app', 'DEV-FLT-24', 'Complete cross-platform shop application with cart and checkout logic.', 'Native Flutter E-commerce Source Code', 58000, 75000, 58000, 'instock', 999, 21, 4.40, 'publish'),
('PostgreSQL DB Visualizer', 'db-visualizer', 'DEV-DBV-25', 'Visualize schema relations and manage SQL queries through a clean web interface.', 'Browser-based database management tool', 45000, 45000, 0, 'instock', 999, 12, 4.55, 'publish'),

-- Content Creator Kit
('Cinematic LUTs Bundle', 'cinematic-luts', 'CCK-LUT-26', '50 color grading presets for Premiere Pro, Resolve, and Final Cut.', 'Professional color grading LUTs for video', 22000, 35000, 22000, 'instock', 999, 35, 4.60, 'publish'),
('Ambient Sound FX Pack', 'ambient-sfx', 'CCK-SFX-27', '200+ high-quality foley and ambient background sounds for video editors.', 'High-fidelity ambient sound effects library', 12500, 12500, 0, 'instock', 999, 21, 4.70, 'publish'),
('Video Transition Pack', 'video-transitions', 'CCK-TRN-28', 'Glitch, zoom, and light-leak transitions for cinematic story telling.', 'Dynamic video editor transition presets', 16000, 16000, 0, 'instock', 999, 42, 4.65, 'publish'),
('Creator Growth Manual', 'creator-manual', 'CCK-MAN-29', 'E-book strategy guide for growing a YouTube and TikTok following from scratch.', 'Definitive guide to social media growth', 8500, 15000, 8500, 'instock', 999, 94, 4.80, 'publish'),
('4K Overlay Textures', 'video-overlays', 'CCK-OVL-30', 'Film grain, dust, and scratch overlays to give your video a vintage look.', 'Pro 4K film texture and scratch overlays', 28000, 28000, 0, 'instock', 999, 16, 4.40, 'publish')
ON CONFLICT (slug) DO NOTHING;

-- ── 3. Images (Digital Presentation Styles) ──────────────────

INSERT INTO bluzett_product_images (product_id, src, name, alt, position)
SELECT id, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000', 'CRM Screenshot', 'Dashboard Visualization', 0 FROM bluzett_products WHERE slug = 'nestora-crm-pro' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1000', 'Coding Screen', 'Programming Bootcamp Preview', 0 FROM bluzett_products WHERE slug = 'react-mastery-course' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000', 'Design Abstract', 'UI Design System Components', 0 FROM bluzett_products WHERE slug = 'ultra-ui-kit' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1000', 'API Code', 'Development Firewall Script', 0 FROM bluzett_products WHERE slug = 'api-firewall' UNION ALL
SELECT id, 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1000', 'Saas Platform', 'Enterprise Subscriptions View', 0 FROM bluzett_products WHERE slug = 'web-hosting-pro'
ON CONFLICT DO NOTHING;

-- ── 4. Attributes (Digital Specs) ────────────────────────────

INSERT INTO bluzett_product_attributes (product_id, name, options, position)
SELECT id, 'License Tier', ARRAY['Single User', 'Business (5 Users)', 'Enterprise'], 0 FROM bluzett_products WHERE slug = 'nestora-crm-pro' ON CONFLICT DO NOTHING;

INSERT INTO bluzett_product_attributes (product_id, name, options, position)
SELECT id, 'File Format', ARRAY['Figma', 'Sketch', 'Adobe XD'], 0 FROM bluzett_products WHERE slug = 'ultra-ui-kit' ON CONFLICT DO NOTHING;

INSERT INTO bluzett_product_attributes (product_id, name, options, position)
SELECT id, 'Course Language', ARRAY['English', 'Spanish', 'French'], 0 FROM bluzett_products WHERE slug = 'react-mastery-course' ON CONFLICT DO NOTHING;

-- ── 5. Category Linking ───────────────────────────────────────

INSERT INTO bluzett_product_categories (product_id, category_id)
SELECT p.id, c.id FROM bluzett_products p, bluzett_categories c 
WHERE p.slug = 'nestora-crm-pro' AND c.slug IN ('software-apps') UNION ALL
SELECT p.id, c.id FROM bluzett_products p, bluzett_categories c 
WHERE p.slug = 'ultra-ui-kit' AND c.slug IN ('design-assets', 'ui-templates') UNION ALL
SELECT p.id, c.id FROM bluzett_products p, bluzett_categories c 
WHERE p.slug = 'react-mastery-course' AND c.slug IN ('digital-courses', 'code-courses')
ON CONFLICT DO NOTHING;

-- ── 6. Final Sync ───────────────────────────────────────────

UPDATE bluzett_categories c SET count = (SELECT COUNT(*) FROM bluzett_product_categories pc WHERE pc.category_id = c.id);