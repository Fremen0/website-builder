const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// @route   POST api/projects
// @desc    Create a project
router.post('/', projectController.createProject);

// @route   GET api/projects
// @desc    Get all projects
router.get('/', projectController.getProjects);

// @route   GET / PUT / DELETE api/projects/:id
router.get('/:id', projectController.getProjectById);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;