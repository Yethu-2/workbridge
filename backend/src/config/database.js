// In-memory database simulation
// In production, replace this with MongoDB, PostgreSQL, or your preferred database

class Database {
  constructor() {
    this.users = [];
    this.jobs = [];
    this.applications = [];
    this.reviews = [];
    this.communityPosts = [];
    this.volunteers = [];
    this.mentors = [];
    this.messages = [];
    
    // Initialize with some sample data
    this.initializeSampleData();
  }

  initializeSampleData() {
    // Sample jobs
    this.jobs = [
      {
        id: '1',
        title: 'Software Developer',
        company: 'Tech Corp',
        location: 'Seoul, South Korea',
        salary: '50,000,000 - 70,000,000 KRW',
        type: 'Full-time',
        description: 'Looking for an experienced software developer...',
        requirements: ['3+ years experience', 'JavaScript/React', 'Node.js'],
        employerId: 'employer1',
        applicants: [],
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'English Teacher',
        company: 'Language Academy',
        location: 'Tokyo, Japan',
        salary: '2,800,000 - 3,500,000 JPY',
        type: 'Full-time',
        description: 'Native English speaker needed for teaching position...',
        requirements: ['TEFL/TESOL certificate', 'Bachelor\'s degree', 'Native English speaker'],
        employerId: 'employer2',
        applicants: [],
        createdAt: new Date().toISOString()
      }
    ];

    // Sample community posts
    this.communityPosts = [
      {
        id: '1',
        userId: 'user1',
        userName: 'John Doe',
        title: 'Tips for working in Korea',
        content: 'Here are some useful tips for expats working in Korea...',
        category: 'advice',
        likes: 15,
        comments: [],
        images: [],
        createdAt: new Date().toISOString()
      }
    ];

    // Sample mentors
    this.mentors = [
      {
        id: '1',
        name: 'Sarah Kim',
        expertise: ['Career Development', 'Visa Process'],
        languages: ['English', 'Korean'],
        experience: '10 years',
        rating: 4.8,
        availability: 'Available',
        hourlyRate: 50,
        bio: 'Experienced career counselor specializing in helping expats...',
        reviews: []
      }
    ];
  }

  // Generic CRUD operations
  create(collection, data) {
    const item = {
      ...data,
      id: this.generateId(collection),
      createdAt: new Date().toISOString()
    };
    this[collection].push(item);
    return item;
  }

  findAll(collection, filter = {}) {
    let results = [...this[collection]];
    
    // Apply filters
    Object.keys(filter).forEach(key => {
      if (filter[key]) {
        results = results.filter(item => {
          if (typeof filter[key] === 'object' && filter[key].$regex) {
            return new RegExp(filter[key].$regex, 'i').test(item[key]);
          }
          return item[key] === filter[key];
        });
      }
    });
    
    return results;
  }

  findById(collection, id) {
    return this[collection].find(item => item.id === id);
  }

  findOne(collection, filter) {
    return this[collection].find(item => {
      return Object.keys(filter).every(key => item[key] === filter[key]);
    });
  }

  update(collection, id, data) {
    const index = this[collection].findIndex(item => item.id === id);
    if (index === -1) return null;
    
    this[collection][index] = {
      ...this[collection][index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return this[collection][index];
  }

  delete(collection, id) {
    const index = this[collection].findIndex(item => item.id === id);
    if (index === -1) return false;
    
    this[collection].splice(index, 1);
    return true;
  }

  generateId(collection) {
    const ids = this[collection].map(item => parseInt(item.id) || 0);
    return String(Math.max(0, ...ids) + 1);
  }

  // Clear all data (useful for testing)
  clear() {
    this.users = [];
    this.jobs = [];
    this.applications = [];
    this.reviews = [];
    this.communityPosts = [];
    this.volunteers = [];
    this.mentors = [];
    this.messages = [];
    this.initializeSampleData();
  }
}

// Singleton instance
const db = new Database();

export default db;
