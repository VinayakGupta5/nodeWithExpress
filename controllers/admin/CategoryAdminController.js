const Category = require('../../models/CategoryModel')
const connectToDb = require('../../conn/connectMongoose')

exports.CreateMainCategory = async (req, res, next) => {

  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        try {
          const { name, parent } = req.body;

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

          const parentCategory = await Category.findById(parentId);

          if (!parentCategory) {
            throw new Error('Parent category not found');
          }

          const subcategory = new Category({ name, parent: parentCategory._id });

          await subcategory.save();

          parentCategory.children.push(subcategory);

          await parentCategory.save();

          res.status(201).send(subcategory);
        } catch (err) {
          res.status(400).json({ error: err.message });
        }
      })
  }

  mongoConnect()
}


exports.getCategory = async (req, res, next) => {

  console.log("get category---------")
  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        try {
          const categories = await Category.find().populate('children').populate('children').populate('children');
          return res.send({
            status: 'success',
            msg: '',
            data: categories
          });
        } catch (err) {
          return res.status(500).json({
            status: 'success',
            msg: '',
            data: err
          });
        }
      })
  }
  mongoConnect()
}





