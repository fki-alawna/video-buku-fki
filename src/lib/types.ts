export interface Folder {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
}

export interface Video {
  id: string;
  folder_id: string | null;
  title: string;
  drive_file_id: string;
  slug: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface VideoWithFolder extends Video {
  folders: {
    id: string;
    name: string;
    slug: string;
  } | null;
}
