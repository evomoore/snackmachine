const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  meta: {
    publication_date: Date,
    original_publication: String,
    author: String,
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    }
  },
  content: {
    type: String,
    required: true
  },
  media: {
    featured_image: {
      url: String,
      alt: String,
      title: String
    }
  },
  tags: [{
    type: String
  }],
  categories: [{
    type: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema); 