export interface Member {
  id: string;
  name: string;
  title: string | null;
  company: string | null;
  bio: string | null;
  photo_url: string | null;
  twitter_url: string | null;
  skills: string[];
  badges: string[];
  achievements: Record<string, unknown> | null;
  is_core_team: boolean;
  is_featured: boolean;
  display_order: number;
  status: "draft" | "published";
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: string;
  luma_id: string | null;
  title: string;
  description: string | null;
  cover_url: string | null;
  start_at: string;
  end_at: string | null;
  timezone: string;
  location_name: string | null;
  location_address: string | null;
  meeting_url: string | null;
  luma_url: string | null;
  is_featured: boolean;
  event_type: string;
  status: "draft" | "published";
  synced_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  description: string | null;
  partner_type: "ecosystem" | "sponsor" | "media" | "infrastructure";
  display_order: number;
  status: "draft" | "published";
  created_at: string;
}

export interface PageContent {
  id: string;
  section_key: string;
  content_type: "text" | "markdown" | "image" | "json";
  value: string;
  metadata: Record<string, unknown> | null;
  updated_by: string | null;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string | null;
  body_md: string | null;
  image_url: string | null;
  link_url: string | null;
  is_pinned: boolean;
  status: "draft" | "published";
  published_at: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  author_photo_url: string | null;
  content: string;
  tweet_url: string | null;
  is_tweet: boolean;
  display_order: number;
  status: "draft" | "published";
  created_at: string;
}

export interface Stat {
  id: string;
  stat_key: string;
  label: string;
  value: number;
  suffix: string | null;
  prefix: string | null;
  display_order: number;
}

export interface AdminProfile {
  id: string;
  display_name: string;
  role: "admin" | "editor";
}

export interface Database {
  public: {
    Tables: {
      members: { Row: Member; Insert: Omit<Member, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Member, "id">> };
      events: { Row: Event; Insert: Omit<Event, "id" | "created_at" | "updated_at">; Update: Partial<Omit<Event, "id">> };
      partners: { Row: Partner; Insert: Omit<Partner, "id" | "created_at">; Update: Partial<Omit<Partner, "id">> };
      page_content: { Row: PageContent; Insert: Omit<PageContent, "id" | "updated_at">; Update: Partial<Omit<PageContent, "id">> };
      announcements: { Row: Announcement; Insert: Omit<Announcement, "id" | "created_at">; Update: Partial<Omit<Announcement, "id">> };
      testimonials: { Row: Testimonial; Insert: Omit<Testimonial, "id" | "created_at">; Update: Partial<Omit<Testimonial, "id">> };
      stats: { Row: Stat; Insert: Omit<Stat, "id">; Update: Partial<Omit<Stat, "id">> };
      admin_profiles: { Row: AdminProfile; Insert: AdminProfile; Update: Partial<AdminProfile> };
    };
  };
}
