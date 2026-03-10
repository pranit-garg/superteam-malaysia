-- ============================================================
-- Seed page_content with JSON blobs for all landing page sections
-- ============================================================
-- Uses WHERE NOT EXISTS to avoid duplicating rows on re-run.

-- Hero
INSERT INTO page_content (section_key, content_type, value)
SELECT 'hero', 'json', '{
  "headline_1": "Where Malaysia",
  "headline_2": "Builds Solana",
  "subheadline": "The home for Solana builders in Malaysia. Ship projects, earn bounties, grow together.",
  "cta_1_text": "Join Community",
  "cta_1_url": "https://t.me/SuperteamMY",
  "cta_2_text": "Earn on Solana",
  "cta_2_url": "https://superteam.fun/earn",
  "video_url": "/videos/hero-bg.mp4"
}'
WHERE NOT EXISTS (SELECT 1 FROM page_content WHERE section_key = 'hero');

-- Mission
INSERT INTO page_content (section_key, content_type, value)
SELECT 'mission', 'json', '{
  "eyebrow": "Who We Are",
  "headline": "Creatives, Developers, Operators",
  "headline_accent": " Building Solana",
  "description": "We value the sovereignty that comes with founding a company, the skin in the game that comes with investing, and the joy that comes with getting sh*t done.",
  "pillars": [
    {"title": "Builder Support", "description": "Mentorship, code reviews, and technical help from experienced Solana devs based in the region."},
    {"title": "Events & Hackathons", "description": "Meetups, workshops, and hackathons across KL, Penang, and JB. Show up and build with others."},
    {"title": "Grants & Funding", "description": "Solana Foundation grants, ecosystem funding, and project investment. We help you find and apply."},
    {"title": "Jobs & Bounties", "description": "Bounties, freelance gigs, and full-time roles from Solana projects looking for talent."},
    {"title": "Education", "description": "Workshops covering Rust, Anchor, DeFi, NFTs, and more. Beginner intros to deep technical dives."},
    {"title": "Ecosystem Access", "description": "Connections to the global Superteam network, Solana Foundation, and ecosystem partners worldwide."}
  ]
}'
WHERE NOT EXISTS (SELECT 1 FROM page_content WHERE section_key = 'mission');

-- Pathway
INSERT INTO page_content (section_key, content_type, value)
SELECT 'pathway', 'json', '{
  "eyebrow": "Your Path",
  "headline_1": "Learn. Earn.",
  "headline_2": "Build.",
  "description": "Three steps to go from curious to contributor in the Solana ecosystem.",
  "steps": [
    {
      "number": "01",
      "label": "LEARN",
      "title": "Start with Solana",
      "description": "Free developer resources, workshops, and the community to learn alongside. No experience required.",
      "links": [
        {"label": "Developer Resources", "href": "https://solana.com/developers"},
        {"label": "Build on Solana", "href": "https://build.superteam.fun"},
        {"label": "Newsletters", "href": "https://my.superteam.fun/superteam-my-newsletters"}
      ]
    },
    {
      "number": "02",
      "label": "EARN",
      "title": "Get Paid to Build",
      "description": "Bounties, freelance gigs, grants, and full-time roles. Real money for real work.",
      "links": [
        {"label": "Browse Bounties", "href": "https://superteam.fun/earn"},
        {"label": "Find Jobs", "href": "https://jobs.solana.com/jobs"},
        {"label": "Apply for Grants", "href": "https://superteam.fun/earn/grants/"}
      ]
    },
    {
      "number": "03",
      "label": "BUILD",
      "title": "Ship with the Community",
      "description": "Join hackathons, get mentorship from experienced devs, and launch your project with ecosystem support.",
      "links": [
        {"label": "Events Calendar", "href": "https://lu.ma/mysuperteam"},
        {"label": "Brand Kit", "href": "https://drive.google.com/drive/folders/1rmpMBbUTSCJnGoaHRi7dYtiOEAqiPVWv"}
      ]
    }
  ]
}'
WHERE NOT EXISTS (SELECT 1 FROM page_content WHERE section_key = 'pathway');

-- In Action
INSERT INTO page_content (section_key, content_type, value)
SELECT 'in_action', 'json', '{
  "eyebrow": "In Action",
  "headline": "Superteam Malaysia ",
  "headline_accent": "In Action",
  "images": [
    {"src": "/images/in-action/photo-2.jpg", "alt": "Superteam Malaysia community event"},
    {"src": "/images/in-action/photo-3.jpg", "alt": "Bounty Hunter workshop session"},
    {"src": "/images/in-action/photo-4.jpg", "alt": "Superteam MY meetup activities"},
    {"src": "/images/in-action/photo-5.jpg", "alt": "Solana Network School Outpost talk"},
    {"src": "/images/in-action/photo-6.jpg", "alt": "Community builders brainstorming"},
    {"src": "/images/in-action/photo-7.jpg", "alt": "Superteam Malaysia event"},
    {"src": "/images/in-action/photo-8.jpg", "alt": "Builder showcase presentation"}
  ]
}'
WHERE NOT EXISTS (SELECT 1 FROM page_content WHERE section_key = 'in_action');

-- Join CTA
INSERT INTO page_content (section_key, content_type, value)
SELECT 'join_cta', 'json', '{
  "eyebrow": "Ready to build?",
  "headline_1": "Your next chapter",
  "headline_2": "here",
  "subheadline": "Builders, designers, and creators in Malaysia''s most active Solana community. Join the Telegram, start contributing, and grow with us.",
  "cta_1_text": "Join Telegram",
  "cta_1_url": "https://t.me/SuperteamMY",
  "cta_2_text": "Follow on X",
  "cta_2_url": "https://x.com/SuperteamMY",
  "video_url": "/videos/cta-bg.mp4"
}'
WHERE NOT EXISTS (SELECT 1 FROM page_content WHERE section_key = 'join_cta');
