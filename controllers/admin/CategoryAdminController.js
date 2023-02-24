const Category = require('../../models/CategoryModel')
const connectToDb = require('../../conn/connectMongoose')


exports.CreateMainCategory = async (req, res, next) => {

  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        try {
          const { name, parent } = req.body;
          console.log("name", name)
          console.log("parent", parent)

          const category = new Category({ name, parent });

          await category.save();

          res.status(201).json(category);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      })
  }

  mongoConnect()
}
exports.CreateSubCategory = async (req, res) => {

  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        try {
          const { name, parentId } = req.body;

          console.log("name", name)
          console.log("parentId", parentId)

          const parentCategory = await Category.findById(parentId);
          console.log("parentCategory", parentCategory)

          if (!parentCategory) {
            throw new Error('Parent category not found');
          }

          const subcategory = new Category({ name, parent: parentCategory._id });

          await subcategory.save();

          parentCategory.children.push(subcategory);

          await parentCategory.save();

          res.status(201).json(subcategory);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      })
  }

  mongoConnect()
}
exports.getCategory = async (req, res, next) => {

  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        try {
          const categories = await Category.find().populate('children').populate('children').populate('children');
          res.json(categories);
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Server error' });
        }
      })
  }

  mongoConnect()
}





