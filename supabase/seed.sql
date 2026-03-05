-- Seed data for Superteam Malaysia
-- All records are set to 'published' for immediate visibility

-- ============================================================
-- Members (matching SAMPLE_MEMBERS from data/members.ts)
-- ============================================================
insert into public.members (name, title, company, skills, badges, is_core_team, is_featured, display_order, twitter_url, status) values
  ('Hans Tan', 'Community Lead', 'Superteam Malaysia', '{"Community","Growth","Product"}', '{"Core Contributor"}', true, true, 1, 'https://x.com/hanstmy', 'published'),
  ('Sarah Chen', 'Fullstack Developer', 'Solana Labs', '{"Rust","Frontend","Product"}', '{"Solana Builder","Hackathon Winner"}', false, true, 2, null, 'published'),
  ('Ahmad Rizal', 'UI/UX Designer', 'Independent', '{"Design","Frontend","Content"}', '{"Grant Recipient"}', false, true, 3, null, 'published'),
  ('Mei Lin Wong', 'DeFi Researcher', 'Jump Crypto', '{"Growth","Content","Community"}', '{"DAO Contributor","Solana Builder"}', false, true, 4, null, 'published'),
  ('Raj Kumar', 'Smart Contract Engineer', 'Marinade Finance', '{"Rust","Product"}', '{"Hackathon Winner","Core Contributor"}', true, false, 5, null, 'published'),
  ('Nurul Aisyah', 'Growth Lead', 'Superteam Malaysia', '{"Growth","Content","Community"}', '{"Core Contributor"}', true, true, 6, null, 'published');

-- ============================================================
-- Events
-- ============================================================
insert into public.events (title, description, start_at, end_at, location_name, location_address, event_type, is_featured, status) values
  ('Solana Developer Meetup KL', 'Monthly developer meetup for Solana builders in Kuala Lumpur. Talks, demos, and networking.', '2026-03-15 14:00:00+08', '2026-03-15 17:00:00+08', 'Co-labs Coworking', 'Naza Tower, Kuala Lumpur', 'meetup', true, 'published'),
  ('Superteam Malaysia Hackathon 2026', 'A 48-hour hackathon focused on building real-world Solana applications for the Malaysian market.', '2026-04-05 09:00:00+08', '2026-04-07 18:00:00+08', 'WORQ TTDI', 'Taman Tun Dr Ismail, Kuala Lumpur', 'hackathon', true, 'published'),
  ('DeFi Deep Dive Workshop', 'Hands-on workshop exploring DeFi protocols on Solana. Suitable for intermediate developers.', '2026-03-22 10:00:00+08', '2026-03-22 13:00:00+08', 'Online', null, 'workshop', false, 'published');

-- ============================================================
-- Partners
-- ============================================================
insert into public.partners (name, website_url, partner_type, display_order, status) values
  ('Solana Foundation', 'https://solana.org', 'ecosystem', 1, 'published'),
  ('Superteam', 'https://superteam.fun', 'ecosystem', 2, 'published'),
  ('Helius', 'https://helius.dev', 'infrastructure', 3, 'published'),
  ('Jito', 'https://jito.network', 'infrastructure', 4, 'published'),
  ('Jupiter', 'https://jup.ag', 'ecosystem', 5, 'published'),
  ('Marinade', 'https://marinade.finance', 'ecosystem', 6, 'published'),
  ('Phantom', 'https://phantom.app', 'ecosystem', 7, 'published'),
  ('Magic Eden', 'https://magiceden.io', 'ecosystem', 8, 'published');

-- ============================================================
-- Stats
-- ============================================================
insert into public.stats (stat_key, label, value, suffix, display_order) values
  ('members', 'Members', 500, '+', 1),
  ('events_hosted', 'Events Hosted', 30, '+', 2),
  ('projects_built', 'Projects Built', 45, '+', 3),
  ('bounties_completed', 'Bounties Completed', 120, '+', 4),
  ('community_reach', 'Community Reach', 15000, '+', 5);

-- ============================================================
-- Testimonials
-- ============================================================
insert into public.testimonials (author_name, author_title, content, display_order, status) values
  ('Wei Jian Lim', 'Founder, SolPay', 'Superteam Malaysia helped us go from idea to mainnet in three months. The developer community here is incredibly supportive.', 1, 'published'),
  ('Aisha Rahman', 'Smart Contract Developer', 'The hackathons and bounties gave me the confidence and skills to transition into full-time Web3 development. Could not have done it without this community.', 2, 'published'),
  ('David Ong', 'Product Manager, Phantom', 'The Malaysian Solana community is one of the most vibrant in Southeast Asia. Superteam has done an amazing job fostering real builder culture.', 3, 'published'),
  ('Priya Nair', 'DeFi Analyst', 'From weekly meetups to deep-dive workshops, Superteam Malaysia consistently delivers high-quality events that actually help builders ship.', 4, 'published');

-- ============================================================
-- Page content (FAQ entries)
-- ============================================================
insert into public.page_content (section_key, content_type, value, metadata) values
  ('faq_what_is_superteam', 'markdown', 'Superteam Malaysia is a community of builders, creators, and operators working on the Solana ecosystem in Malaysia. We help members find grants, bounties, jobs, and collaborators to build on Solana.', '{"question": "What is Superteam Malaysia?", "order": 1}'),
  ('faq_how_to_join', 'markdown', 'Join our community by attending one of our events or reaching out on X (Twitter). We welcome developers, designers, marketers, and anyone excited about Solana.', '{"question": "How do I join Superteam Malaysia?", "order": 2}'),
  ('faq_bounties', 'markdown', 'Superteam runs bounties through the Superteam Earn platform. Members can complete tasks ranging from development to content creation and earn rewards in SOL or USDC.', '{"question": "How do bounties work?", "order": 3}'),
  ('faq_events', 'markdown', 'We host regular meetups, hackathons, and workshops in Kuala Lumpur and online. Check our Events page for upcoming activities and register through Luma.', '{"question": "Where can I find upcoming events?", "order": 4}'),
  ('faq_partner', 'markdown', 'We partner with projects building on Solana who want to grow their presence in Malaysia. Reach out to our team through X (Twitter) or attend one of our events to discuss partnership opportunities.', '{"question": "How can my project partner with Superteam Malaysia?", "order": 5}');
