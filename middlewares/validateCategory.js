const Category = require('../models/Category');

const validateCategory = async (req, res, next) => {
    const { category } = req.body;

    try {
        const categoryExists = await Category.findOne({ name: category });
        if (!categoryExists) {
            return res.status(400).json({ msg: `Category '${category}' is not valid` });
        }
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

module.exports = validateCategory;