const Template = require('../models/Template');

// Create a new template
exports.createTemplate = async (req, res) => {
    try {
        const { name, components } = req.body;
        if (!name || !components) {
            return res.status(400).json({ msg: 'Please provide a name and components for the template.' });
        }

        const newTemplate = new Template({ name, components });
        const template = await newTemplate.save();
        res.status(201).json(template);
    } catch (err) {
        console.error(err.message);
        if (err.code === 11000) {
            return res.status(400).json({ msg: 'A template with this name already exists.' });
        }
        res.status(500).send('Server Error');
    }
};

// Get all templates
exports.getTemplates = async (req, res) => {
    try {
        const templates = await Template.find().sort({ createdAt: -1 });
        res.json(templates);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// Delete template
exports.deleteTemplate = async (req, res) => {
    try {
        await Template.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Template removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};