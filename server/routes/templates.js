const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

// @route   POST api/templates
// @desc    Create a new template
router.post('/', templateController.createTemplate);

// @route   GET api/templates
// @desc    Get all templates
router.get('/', templateController.getTemplates);

// @route   DELETE api/templates/:id
// @desc    Delete a template
router.delete('/:id', templateController.deleteTemplate);

module.exports = router;