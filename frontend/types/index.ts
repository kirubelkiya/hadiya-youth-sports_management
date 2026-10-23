export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface News {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string | null;
  published_date: string;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string | null;
  status: 'active' | 'cancelled' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface YouthProgram {
  id: number;
  title: string;
  description: string;
  image: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Sport {
  id: number;
  name: string;
  description: string;
  image: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  year: number;
  image: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  media_type: 'photo' | 'video';
  media_url: string;
  category: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: number;
  type: 'sport' | 'event' | 'vacancy';
  full_name: string;
  email: string;
  phone: string;
  age: number | null;
  gender: 'male' | 'female' | 'other' | null;
  sport_name: string | null;
  experience: string | null;
  event_name: string | null;
  position: string | null;
  education: string | null;
  cv_link: string | null;
  message: string | null;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: 0 | 1;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface DashboardStats {
  stats: {
    news: number;
    events: number;
    youthPrograms: number;
    sports: number;
    achievements: number;
    gallery: number;
  };
  recentNews: News[];
  upcomingEvents: Event[];
}
