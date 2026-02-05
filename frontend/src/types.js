/**
 * Type definitions for the WorkBridge application
 * These are now in JavaScript for a pure JS/React setup
 */

// TranslatedString type - object with language keys
export const TranslatedString = {
  ko: String,
  en: String,
  vi: String,
};

// User preferences interface
export const UserPreferences = {
  desiredJobTypes: Array,
  desiredLocations: Array,
  minSalary: Number,
  currency: String, // 'KRW' | 'VND' | 'USD'
};

// Review interface for employer and applicant feedback
export const Review = {
  id: Number,
  reviewerName: String,
  reviewerNationality: TranslatedString,
  workDuration: TranslatedString,
  rating: Number,
  date: String,
  comment: TranslatedString,
  reviewerAverageRating: Number,
};

// Employer interface
export const Employer = {
  id: Number,
  name: TranslatedString,
  logo: String,
  industry: TranslatedString,
  location: TranslatedString,
  averageRating: Number,
  totalReviews: Number,
  reviews: Array, // Review[]
};

// User profile interface
export const UserProfile = {
  id: Number,
  name: String,
  nationality: TranslatedString,
  avatar: String,
  age: Number, // optional
  videoUrl: String, // optional
  university: String, // optional
  role: String, // 'employee' | 'employer' | 'admin'
  selfIntroduction: String, // optional
  preferences: UserPreferences, // optional
  aiVerification: {
    devScore: Number,
    englishFluency: Number,
    koreanFluency: Number,
    culturalAdaptability: Number,
    ocrVerified: Boolean,
  }, // optional
  visaDiagnosis: {
    probability: Number,
    eligibleType: String,
  }, // optional
  skills: Array, // TranslatedString[] optional
  wpReady: {
    koreanLevel: Number,
    trainingCompletion: Number,
    behavioralScore: Number,
  }, // optional
  reviewHistory: Array, // optional
};

// Job interface
export const Job = {
  id: Number,
  title: TranslatedString,
  type: TranslatedString,
  salary: {
    amount: Number,
    currency: String, // 'KRW' | 'VND' | 'USD'
    text: TranslatedString,
  },
  description: TranslatedString,
  employer: Employer,
  industry: TranslatedString,
  location: TranslatedString,
  dueDate: String,
  applicationQuestions: Array, // optional
};

// Community Post interface
export const CommunityPost = {
  id: Number,
  title: TranslatedString,
  content: TranslatedString,
  author: String,
  date: String,
  category: TranslatedString,
  categoryType: String, // 'general' | 'qna'
  direction: String, // 'vn-to-kr' | 'kr-to-vn'
  comments: Array,
};

// Photo Post interface
export const PhotoPost = {
  id: Number,
  imageUrl: String,
  caption: TranslatedString,
  author: String,
  avatar: String,
  location: TranslatedString, // optional
};

// Market Item interface
export const MarketItem = {
  id: Number,
  imageUrl: String,
  title: TranslatedString,
  price: String,
  location: TranslatedString,
};

// Employer Profile interface
export const EmployerProfile = {
  ...UserProfile,
  companyName: TranslatedString,
  companyLogo: String,
  postedJobs: Array, // Job[]
};

// Applicant interface
export const Applicant = {
  id: Number,
  name: String,
  avatar: String,
  nationality: TranslatedString,
  appliedDate: String,
  status: String, // 'new' | 'reviewed' | 'interviewing' | 'hired' | 'rejected'
};

// Mentor interface
export const Mentor = {
  id: Number,
  name: String,
  avatar: String,
  company: TranslatedString,
  location: TranslatedString,
  skills: Array, // TranslatedString[]
  bio: TranslatedString,
  mentoringTypes: Array, // ('online' | 'offline')[]
};

// Volunteer Opportunity interface
export const VolunteerOpportunity = {
  id: Number,
  title: TranslatedString,
  organization: TranslatedString,
  logo: String,
  location: TranslatedString,
  duration: TranslatedString,
  dueDate: String, // optional
  isBookmarked: Boolean,
};

// Code Analysis Result interface
export const CodeAnalysisResult = {
  score: Number,
  metrics: {
    cleanCode: Number,
    efficiency: Number,
    security: Number,
    architecture: Number,
  },
  summary: TranslatedString,
  suggestions: Array, // TranslatedString[]
};
