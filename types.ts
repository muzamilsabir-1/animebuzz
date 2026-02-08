
export interface Anime {
  id: string;
  title: string;
  description: string;
  image: string;
  banner: string;
  rating: number;
  episodes: number;
  genres: string[];
  type: 'Series' | 'Movie';
  status: 'Ongoing' | 'Completed';
  language: 'Sub' | 'Dub' | 'Both';
  year: number;
}

export type Genre = 
  | 'Action' 
  | 'Romance' 
  | 'Comedy' 
  | 'Fantasy' 
  | 'Horror' 
  | 'Sci-Fi' 
  | 'Slice of Life' 
  | 'Slice of Life1111' 
  | 'Adventure';
