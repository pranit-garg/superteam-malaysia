export interface Testimonial {
  author_name: string;
  author_title: string;
  content: string;
  is_tweet: boolean;
  tweet_id: string | null;
  size: "compact" | "standard" | "featured";
}

export const TESTIMONIALS: Testimonial[] = [
  {
    author_name: "Superteam Malaysia",
    author_title: "@SuperteamMY",
    content: "Building the Solana ecosystem in Malaysia, one builder at a time.",
    is_tweet: true,
    tweet_id: "1895849890805547078",
    size: "standard",
  },
  {
    author_name: "Developer from KL",
    author_title: "Frontend Engineer",
    content:
      "Got my first Solana bounty through Superteam MY. Three months later, I'd shipped a full dApp. People here actually build together, not just talk about it.",
    is_tweet: false,
    tweet_id: null,
    size: "standard",
  },
  {
    author_name: "Superteam Malaysia",
    author_title: "@SuperteamMY",
    content: "Another amazing meetup in KL! The energy is unmatched.",
    is_tweet: true,
    tweet_id: "1893651655189831892",
    size: "standard",
  },
  {
    author_name: "Designer from Penang",
    author_title: "Product Designer",
    content:
      "The workshops are legit useful. Hands-on building, not just slides. You walk away having actually shipped something.",
    is_tweet: false,
    tweet_id: null,
    size: "compact",
  },
  {
    author_name: "Builder from JB",
    author_title: "Rust Developer",
    content:
      "Met my co-founder at a Superteam MY meetup. Now we're building on Solana full-time. Best community I've been part of.",
    is_tweet: false,
    tweet_id: null,
    size: "featured",
  },
  {
    author_name: "Community Member",
    author_title: "Growth Lead",
    content:
      "Went from zero Solana knowledge to completing my first grant in 4 months. The people here gave me a roadmap and actually helped me follow through.",
    is_tweet: false,
    tweet_id: null,
    size: "standard",
  },
];

/* Row assignments for marquee */
export const ROW_1_INDICES = [4, 0, 3]; // Builder(featured), Tweet1, Designer(compact)
export const ROW_2_INDICES = [1, 5, 2]; // Developer, Community, Tweet2
