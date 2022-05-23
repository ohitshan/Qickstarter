export interface Project {
  category: any;
  description: string;
  duration: string;
  funding: number;
  images: { filePath: string }[];
  launch: string;
  location: string;
  reward: [];
  risk: string;
  role: number;
  title: any;
  videos: [];
  views: number;
  writer: any;
  _id: string;
}

export interface Reward {
  title: string;
  amount: number;
  description: string;
  contentmain: number;
  contentyes: number;
}

export interface authUserType {
  email: string;
  favorites: Array<any>;
  history: Array<any>;
  isAdmin: boolean;
  isAuth: boolean;
  role: number;
  score: Array<any>;
  summary: Array<any>;
  _id: string;
}

export interface selectorUser {
  authUser: authUserType;
}

export interface Writer {
  email: string;
  name: string;
  favorites: [];
  history: [];
  password: string;
  role: number;
  score: [];
  summary: [];
  token: string;
  __v: number;
  _id: string;
  isAdmin: boolean;
  isAuth: boolean;
  createdAt: Date;
  updatedAt: Date;
  image: { filePath: string }[];
  privacy: boolean;
  biography: string;
  websitesList: [];
  location: string;
}
