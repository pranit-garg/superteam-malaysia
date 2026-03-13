-- ============================================================
-- Superteam Malaysia: Seed Data
-- ============================================================
-- Mirrors the static data files in data/ for initial population.
-- All records are set to status = 'published' for immediate visibility.

-- ============================================================
-- Members (from data/members.ts)
-- ============================================================
insert into public.members (name, title, company, skills, badges, is_core_team, is_featured, display_order, twitter_url, photo_url, status) values
  ('Marianne', 'Co-Lead', 'Superteam Malaysia', '{"Community","Growth","Content"}', '{"Core Contributor"}', true, true, 1, 'https://x.com/tuakdotsol', '/images/members/marianne.jpg', 'published'),
  ('Han', 'Co-Lead, DevRel', 'Superteam Malaysia', '{"DevRel","Community","Operations"}', '{"Core Contributor"}', true, true, 2, 'https://x.com/W_Han_01', '/images/members/han.jpg', 'published'),
  ('Pranit Garg', 'Builder', NULL, '{"Growth","Content","Product"}', '{"Core Contributor"}', true, false, 3, 'https://x.com/pranit', '/images/members/pranit.jpg', 'published');

-- ============================================================
-- Partners (from data/partners.ts, 25 partners)
-- ============================================================
insert into public.partners (name, logo_url, website_url, partner_type, display_order, status) values
  ('Helius',       '/images/partners/helius.svg',       'https://helius.dev',            'infrastructure', 1,  'published'),
  ('Jupiter',      '/images/partners/jupiter.svg',      'https://jup.ag',                'ecosystem',      2,  'published'),
  ('Phantom',      '/images/partners/phantom.svg',      'https://phantom.app',           'ecosystem',      3,  'published'),
  ('Magic Eden',   '/images/partners/magiceden.svg',    'https://magiceden.io',          'ecosystem',      4,  'published'),
  ('Marinade',     '/images/partners/marinade.svg',     'https://marinade.finance',      'ecosystem',      5,  'published'),
  ('Jito',         '/images/partners/jito.svg',         'https://jito.network',          'infrastructure', 6,  'published'),
  ('Tensor',       '/images/partners/tensor.svg',       'https://tensor.trade',          'ecosystem',      7,  'published'),
  ('Raydium',      '/images/partners/raydium.svg',      'https://raydium.io',            'ecosystem',      8,  'published'),
  ('Orca',         '/images/partners/orca.png',         'https://orca.so',               'ecosystem',      9,  'published'),
  ('Drift',        '/images/partners/drift.svg',        'https://drift.trade',           'ecosystem',      10, 'published'),
  ('Kamino',       '/images/partners/kamino.png',       'https://kamino.finance',        'ecosystem',      11, 'published'),
  ('Pyth',         '/images/partners/pyth.png',         'https://pyth.network',          'infrastructure', 12, 'published'),
  ('Metaplex',     '/images/partners/metaplex.png',     'https://metaplex.com',          'infrastructure', 13, 'published'),
  ('Wormhole',     '/images/partners/wormhole.png',     'https://wormhole.com',          'infrastructure', 14, 'published'),
  ('Sanctum',      '/images/partners/sanctum.png',      'https://sanctum.so',            'ecosystem',      15, 'published'),
  ('Meteora',      '/images/partners/meteora.png',      'https://meteora.ag',            'ecosystem',      16, 'published'),
  ('Squads',       '/images/partners/squads.png',       'https://squads.so',             'infrastructure', 17, 'published'),
  ('Backpack',     '/images/partners/backpack.png',     'https://backpack.exchange',     'ecosystem',      18, 'published'),
  ('Render',       '/images/partners/render.png',       'https://rendernetwork.com',     'infrastructure', 19, 'published'),
  ('Helium',       '/images/partners/helium.png',       'https://helium.com',            'infrastructure', 20, 'published'),
  ('marginfi',     '/images/partners/marginfi.png',     'https://marginfi.com',          'ecosystem',      21, 'published'),
  ('Solflare',     '/images/partners/solflare.png',     'https://solflare.com',          'ecosystem',      22, 'published'),
  ('Switchboard',  '/images/partners/switchboard.png',  'https://switchboard.xyz',       'infrastructure', 23, 'published'),
  ('Parcl',        '/images/partners/parcl.png',        'https://parcl.co',              'ecosystem',      24, 'published'),
  ('Zeta',         '/images/partners/zeta.png',         'https://zeta.markets',          'ecosystem',      25, 'published');

-- ============================================================
-- Stats (from data/stats.ts, 5 stats)
-- ============================================================
insert into public.stats (stat_key, label, value, suffix, display_order) values
  ('members',     'Members',              20, NULL,  1),
  ('events',      'Events',               50, NULL,  2),
  ('projects',    'Projects Shipped',     20, NULL,  3),
  ('bounties',    'Bounties Earned',     100, NULL,  4),
  ('impressions', 'Impressions Reached',   1, 'M+',  5);

-- ============================================================
-- Testimonials (from data/testimonials.ts, 12 testimonials)
-- Handle extracted from author_title for tweet URLs.
-- ============================================================
insert into public.testimonials (author_name, author_title, author_photo_url, content, tweet_url, is_tweet, display_order, status) values
  (
    'Pondy (Lami)',
    '@Ponderman_NFT',
    'https://unavatar.io/twitter/Ponderman_NFT',
    'When I first heard about Superteam, I thought it was just a cool club for developers and coders. I really didn''t think there was a place for creative people like me. Fast forward to 2026: I''m now a proud member of SuperteamMY, enjoying all the benefits without writing a single line of code.',
    'https://x.com/Ponderman_NFT/status/2027026361706303670',
    true, 1, 'published'
  ),
  (
    'Superteam Malaysia',
    '@SuperteamMY',
    'https://unavatar.io/twitter/SuperteamMY',
    'HAPPENING NOW: Superteam MY Onboarding Call + Consensus HK Debrief. Two cities, one community: NS library in JB, AWS office in KL. Food, drinks, builders connecting. This is what ecosystem building looks like.',
    'https://x.com/SuperteamMY/status/2029461719777722615',
    true, 2, 'published'
  ),
  (
    'Abang Brooch',
    '@abangbrooch',
    'https://unavatar.io/twitter/abangbrooch',
    'Abang Brooch ended up leading a Doa Selamat (Islamic Prayers) before our Lo Sang & iftar session with the Solana builders. This is the beauty of Malaysia: cultures mixing, founders bonding, Web3 ideas flying. Truly touched by the moment.',
    'https://x.com/abangbrooch/status/2029749717056528609',
    true, 3, 'published'
  ),
  (
    'Marianne',
    '@mariannehere',
    'https://unavatar.io/twitter/mariannehere',
    'Had an INCREDIBLE session with the Superteam Malaysia and Network School people!',
    'https://x.com/mariannehere/status/2029441113967177759',
    true, 4, 'published'
  ),
  (
    'Han',
    '@W_Han_01 | SuperteamMY',
    'https://unavatar.io/twitter/W_Han_01',
    'Only possible in Malaysia. Network School is the only place where you get real work-life balance, healthy meals, positive people, and serious builders.',
    'https://x.com/W_Han_01/status/2026283577089093803',
    true, 5, 'published'
  ),
  (
    'Eric Chan',
    '@canmasu',
    'https://unavatar.io/twitter/canmasu',
    'This is the most prosperous way Malaysians gather and celebrate.',
    'https://x.com/canmasu/status/2029756117832847658',
    true, 6, 'published'
  ),
  (
    'Nizar Syahmi',
    '@nizarsyahmi37',
    'https://unavatar.io/twitter/nizarsyahmi37',
    'Excited to finally join the 1% on Superteam Earn. Huge thanks to the SuperteamMY team for welcoming me into the community. Let the journey begin: build, experiment, learn, ship, and contribute alongside some amazing people.',
    'https://x.com/nizarsyahmi37/status/2029765145044611519',
    true, 7, 'published'
  ),
  (
    'Han',
    '@W_Han_01 | SuperteamMY',
    'https://unavatar.io/twitter/W_Han_01',
    'The mixed culture celebration, sorry I don''t see it anywhere else than Malaysia. ONLY IN MALAYSIA.',
    'https://x.com/W_Han_01/status/2029750912827453925',
    true, 8, 'published'
  ),
  (
    'Superteam Malaysia',
    '@SuperteamMY',
    'https://unavatar.io/twitter/SuperteamMY',
    'Key takeaways from our Ecosystem Sync: Build products that fit into someone''s lifestyle, not an extra step. Retention is overlooked because it doesn''t give instant dopamine. 100 loud believers beat 100,000 ghosts.',
    'https://x.com/SuperteamMY/status/2029440489863487997',
    true, 9, 'published'
  ),
  (
    'Siyi Chen',
    '@Siyi_Chen1 | Chiliz',
    'https://unavatar.io/twitter/Siyi_Chen1',
    'See you next week at Superteam Malaysia!',
    'https://x.com/Siyi_Chen1/status/2029470943781793886',
    true, 10, 'published'
  ),
  (
    'Taufik',
    '@taufiknaaim',
    'https://unavatar.io/twitter/taufiknaaim',
    'Super cool event! If it was close to me, I''d be showing up for sure.',
    'https://x.com/taufiknaaim/status/2029617085903687855',
    true, 11, 'published'
  ),
  (
    'Han',
    '@W_Han_01 | SuperteamMY',
    'https://unavatar.io/twitter/W_Han_01',
    '32 people tuning in, absolute W crowd! See you all in the next one and stay tuned for more banger events from SuperteamMY.',
    'https://x.com/W_Han_01/status/2021431217565159490',
    true, 12, 'published'
  );

-- ============================================================
-- Events (from components/landing/EventsSection.tsx SAMPLE_EVENTS)
-- ============================================================
insert into public.events (title, start_at, location_name, event_type, is_featured, status) values
  ('Solana Developer Workshop: Building with Anchor', '2026-03-20T14:00:00+08:00', 'WeWork KL Sentral', 'Workshop', true, 'published'),
  ('Superteam MY Monthly Meetup', '2026-03-28T18:30:00+08:00', 'Common Ground TTDI', 'Meetup', false, 'published'),
  ('DeFi Deep Dive: Yield Strategies on Solana', '2026-04-05T15:00:00+08:00', 'Online (Zoom)', 'Workshop', false, 'published');

-- ============================================================
-- Announcements
-- ============================================================
insert into public.announcements (title, body, is_pinned, status) values
  ('Website Launch', 'The new Superteam Malaysia website is live! Explore our community, events, and opportunities.', true, 'published');

-- ============================================================
-- Page Content: FAQ (from data/faq.ts, 7 items as JSON array)
-- ============================================================
insert into public.page_content (section_key, content_type, value) values
  ('faq', 'json', '[{"question":"What is Superteam Malaysia?","answer":"We''re the Malaysia chapter of the global Superteam network, focused on growing the Solana ecosystem in one of Southeast Asia''s fastest-growing Web3 hubs. That means events, mentorship, grants, and plugging you into the right people."},{"question":"How do I join?","answer":"Hop into our Telegram group. Just show up, say hi, and start connecting with other builders. Membership (with voting rights) is earned through contributions."},{"question":"What opportunities are available?","answer":"Bounties, grants, hackathons, freelance gigs, and full-time roles across the Solana ecosystem. Check Superteam Earn for the latest listings."},{"question":"How can projects collaborate with us?","answer":"DM us on X or Telegram. We regularly partner with Solana projects on co-hosted events, builder programs, and talent matching."},{"question":"Do I need to be a developer to join?","answer":"Nope. Designers, writers, marketers, community folks, product people, and the simply curious are all welcome. The ecosystem needs more than just code."},{"question":"How does membership work?","answer":"Joining the community is free: hop into Telegram and start connecting. Membership (with voting rights and deeper access) is earned through contributions like completing bounties, hosting events, or shipping projects. It is revised every quarter based on activity."},{"question":"Who do I contact for help?","answer":"For questions about sponsorships, payments, grants, or anything else, DM Marianne (@tuakonsol) or Han on X or Telegram. They are the co-leads and happy to help."}]');
