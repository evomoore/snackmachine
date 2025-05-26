const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single category
router.get('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create category
router.post('/', async (req, res) => {
  try {
    const { name, slug, description, defaultImage } = req.body;

    // Validate defaultImage if provided
    if (defaultImage) {
      if (!defaultImage.url) {
        return res.status(400).json({ message: 'Default image URL is required' });
      }
    }

    const category = new Category({
      name,
      slug,
      description,
      defaultImage
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update category
router.put('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const { name, slug, description, defaultImage } = req.body;

    // Validate defaultImage if provided
    if (defaultImage) {
      // Allow empty strings for both url and alt
      if (defaultImage.url === undefined) {
        return res.status(400).json({ message: 'Default image URL field is required' });
      }
    }

    // Update fields
    if (name) category.name = name;
    if (slug) category.slug = slug;
    if (description !== undefined) category.description = description;
    
    // Handle defaultImage update
    if (defaultImage) {
      category.defaultImage = {
        url: defaultImage.url || '',
        alt: defaultImage.alt || ''
      };
    } else if (defaultImage === null) {
      // Allow removing the default image by sending null
      category.defaultImage = undefined;
    }

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(400).json({ 
      message: 'Error updating category',
      error: error.message 
    });
  }
});

// Delete category
router.delete('/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await Category.deleteOne({ _id: category._id });
    res.json({ 
      message: 'Category deleted successfully',
      deletedCategory: {
        name: category.name,
        slug: category.slug
      }
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ 
      message: 'Error deleting category',
      error: error.message 
    });
  }
});

module.exports = router; 