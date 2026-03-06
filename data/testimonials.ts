export interface Testimonial {
  author_name: string;
  author_title: string;
  content: string;
  is_tweet: boolean;
  tweet_id: string | null;
  size: "compact" | "standard" | "featured";
}

export const TESTIMONIALS: Testimonial[] = [
  // 0 - Featured: Ponderman on joining as a creative (49 likes)
  {
    author_name: "Pondy (Lami)",
    author_title: "@Ponderman_NFT",
    content:
      "When I first heard about Superteam, I thought it was just a cool club for developers and coders. I really didn't think there was a place for creative people like me. Fast forward to 2026: I'm now a proud member of SuperteamMY, enjoying all the benefits without writing a single line of code.",
    is_tweet: true,
    tweet_id: "2027026361706303670",
    size: "featured",
  },
  // 1 - Standard: Superteam MY event tweet (33 likes)
  {
    author_name: "Superteam Malaysia",
    author_title: "@SuperteamMY",
    content:
      "HAPPENING NOW: Superteam MY Onboarding Call + Consensus HK Debrief. Two cities, one community: NS library in JB, AWS office in KL. Food, drinks, builders connecting. This is what ecosystem building looks like.",
    is_tweet: true,
    tweet_id: "2029461719777722615",
    size: "standard",
  },
  // 2 - Featured: Abang Brooch on cultural mixing at event (11 likes)
  {
    author_name: "Abang Brooch",
    author_title: "@abangbrooch",
    content:
      "Abang Brooch ended up leading a Doa Selamat (Islamic Prayers) before our Lo Sang & iftar session with the Solana builders. This is the beauty of Malaysia: cultures mixing, founders bonding, Web3 ideas flying. Truly touched by the moment.",
    is_tweet: true,
    tweet_id: "2029749717056528609",
    size: "featured",
  },
  // 3 - Standard: Marianne on the session (29 likes)
  {
    author_name: "Marianne",
    author_title: "@mariannehere",
    content:
      "Had an INCREDIBLE session with the Superteam Malaysia and Network School people!",
    is_tweet: true,
    tweet_id: "2029441113967177759",
    size: "standard",
  },
  // 4 - Standard: Han on Malaysia being unique (50 likes)
  {
    author_name: "Han",
    author_title: "@W_Han_01 | SuperteamMY",
    content:
      "Only possible in Malaysia. Network School is the only place where you get real work-life balance, healthy meals, positive people, and serious builders.",
    is_tweet: true,
    tweet_id: "2026283577089093803",
    size: "standard",
  },
  // 5 - Compact: Eric Chan on community
  {
    author_name: "Eric Chan",
    author_title: "@canmasu",
    content:
      "This is the most prosperous way Malaysians gather and celebrate.",
    is_tweet: true,
    tweet_id: "2029756117832847658",
    size: "compact",
  },
  // 6 - Standard: Nizar on joining the community
  {
    author_name: "Nizar Syahmi",
    author_title: "@nizarsyahmi37",
    content:
      "Excited to finally join the 1% on Superteam Earn. Huge thanks to the SuperteamMY team for welcoming me into the community. Let the journey begin: build, experiment, learn, ship, and contribute alongside some amazing people.",
    is_tweet: true,
    tweet_id: "2029765145044611519",
    size: "standard",
  },
  // 7 - Compact: Han on mixed culture celebration
  {
    author_name: "Han",
    author_title: "@W_Han_01 | SuperteamMY",
    content:
      "The mixed culture celebration, sorry I don't see it anywhere else than Malaysia. ONLY IN MALAYSIA.",
    is_tweet: true,
    tweet_id: "2029750912827453925",
    size: "compact",
  },
  // 8 - Standard: SuperteamMY Ecosystem Sync key takeaway (16 likes)
  {
    author_name: "Superteam Malaysia",
    author_title: "@SuperteamMY",
    content:
      "Key takeaways from our Ecosystem Sync: Build products that fit into someone's lifestyle, not an extra step. Retention is overlooked because it doesn't give instant dopamine. 100 loud believers beat 100,000 ghosts.",
    is_tweet: true,
    tweet_id: "2029440489863487997",
    size: "standard",
  },
  // 9 - Compact: Siyi Chen speaker tweet
  {
    author_name: "Siyi Chen",
    author_title: "@Siyi_Chen1 | Chiliz",
    content:
      "See you next week at Superteam Malaysia!",
    is_tweet: true,
    tweet_id: "2029470943781793886",
    size: "compact",
  },
  // 10 - Featured: Benjamin, Community Lead (from Substack newsletter)
  {
    author_name: "Benjamin",
    author_title: "Community Lead, Superteam MY",
    content:
      "Superteam Malaysia is not only a community, it's a family filled with various people from different backgrounds, cultivating a significance in the Solana Ecosystem within Malaysia through supporting local projects and providing a platform and resources to excel.",
    is_tweet: false,
    tweet_id: null,
    size: "featured",
  },
  // 11 - Compact: Taufik on the event
  {
    author_name: "Taufik",
    author_title: "@taufiknaaim",
    content:
      "Super cool event! If it was close to me, I'd be showing up for sure.",
    is_tweet: true,
    tweet_id: "2029617085903687855",
    size: "compact",
  },
  // 12 - Standard: Han on community calls
  {
    author_name: "Han",
    author_title: "@W_Han_01 | SuperteamMY",
    content:
      "32 people tuning in, absolute W crowd! See you all in the next one and stay tuned for more banger events from SuperteamMY.",
    is_tweet: true,
    tweet_id: "2021431217565159490",
    size: "standard",
  },
];

/* Row assignments for marquee */
export const ROW_1_INDICES = [0, 3, 7, 8, 11, 4]; // Ponderman(featured), Marianne, Han-culture(compact), EcoSync, Taufik(compact), Han-NS
export const ROW_2_INDICES = [2, 1, 5, 6, 10, 9, 12]; // Abang(featured), STM-event, Eric(compact), Nizar, Benjamin(featured), Siyi(compact), Han-calls
