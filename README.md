# Content Management System API

A RESTful API for managing articles, categories, and tags.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/cms
```

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Articles

- `GET /api/articles` - Get all articles
- `GET /api/articles/:slug` - Get article by slug
- `POST /api/articles` - Create new article
- `PUT /api/articles/:slug` - Update article
- `DELETE /api/articles/:slug` - Delete article

### Categories

- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create new category
- `PUT /api/categories/:slug` - Update category
- `DELETE /api/categories/:slug` - Delete category

### Tags

- `GET /api/tags` - Get all tags
- `GET /api/tags/:slug` - Get tag by slug
- `POST /api/tags` - Create new tag
- `PUT /api/tags/:slug` - Update tag
- `DELETE /api/tags/:slug` - Delete tag

## Article Format

When creating or updating an article, use the following JSON format:

```json
{
  "article": {
    "title": "Article Title",
    "subtitle": "Article Subtitle",
    "slug": "article-slug",
    "meta": {
      "publication_date": "2023-03-14",
      "original_publication": "Source Publication",
      "author": "Author Name",
      "status": "published"
    },
    "content": "<p>Article content in HTML format</p>",
    "media": {
      "featured_image": {
        "url": "/images/image.jpg",
        "alt": "Image description",
        "title": "Image title"
      }
    },
    "tags": ["tag1", "tag2"],
    "categories": ["category1", "category2"]
  }
}
``` 