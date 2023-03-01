const Category = require('../../models/CategoryModel')
const connectToDb = require('../../conn/connectMongoose')

exports.CreateMainCategory = async (req, res, next) => {

  const { name, parent } = req.body;

  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        try {


          const category = new Category({ name, parent });

          await category.save()
            .then(result => {
              return res.status(201).send({
                status: 'success',
                msg: '',
                data: result
              });
            })

        } catch (err) {
          return res.status(400).json({ error: err.message });
        }
      })
  }

  mongoConnect()
}


exports.CreateSubCategory = async (req, res) => {

  const { name, parentId } = req.body;

  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        Category.findById(parentId)
          .then(mainCategory => {
            console.log("mainCategory", mainCategory);
            var category = Category({
              name: name,
              parent: parentId
            })
            category.save()
              .then(categoryResult => {
                mainCategory.children.push(categoryResult._id);
                console.log("mainCategory", mainCategory);
                mainCategory.save()
                  .then(mainCategoryUpdate => {
                    return res.status(201).send({
                      status: 'success',
                      msg: '',
                      data: categoryResult
                    });
                  });
              })
          })
      })
  }

  mongoConnect()
}


exports.getCategory = (req, res, next) => {

  console.log("get category---------1")
  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        try {
          const categories = await Category.find()
            .populate({
              path: 'children',
              populate: {
                path: 'children',
                populate: {
                  path: 'children',
                  populate: {
                    path: 'children',
                    populate: { path: 'children' }
                  }
                }
              }
            })
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

exports.deleteCategory = (req, res, next) => {
  const id = req.params._id;
  console.log("id: " + id);

  const databaseName = req.userData.connectString;
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        Category.findById(id)
          .then((result) => {
            if (result) {
              result.remove()
                .then((deleteResult) => {
                  return res.status(200).send({
                    status: 'deleted',
                    msg: '',
                    data: deleteResult
                  })
                })

            }
            else {
              return res.status(200).send({
                status: '',
                msg: 'this category is not exist',
                data: []
              })
            }
          })
      })
      .catch(err => {
        return res.status(500).json({
          status: 'failed',
          msg: '',
          data: err
        })
      })
  }
  mongoConnect()

}


exports.updateCategory = (req, res, next) => {
  const id = req.body._id
  const name = req.body.name;
  console.log("id: " + id)
  console.log("name: " + name)
  const databaseName = req.userData.connectString;
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        Category.findByIdAndUpdate(id, { name })
          .then(updateCategory => {
            return res.status(200).send({
              status: 'success',
              msg: '',
              data: updateCategory
            })
          })

      })
      .catch(err => {
        return res.status(500).json({
          status: 'failed',
          msg: '',
          data: err
        })
      })
  }

  mongoConnect()
}

exports.getCategoryById = (req, res, next) => {
  const id = req.params._id;
  console.log("id: " + id)
  const databaseName = req.userData.connectString;
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        Category.findById(id)
          .populate({
            path: 'children',
            populate: {
              path: 'children',
              populate: {
                path: 'children',
                populate: {
                  path: 'children',
                  populate: { path: 'children' }
                }
              }
            }
          })
          .then((result) => {
            if (result) {
              return res.status(200).send({
                status: 'success',
                msg: '',
                data: result
              })
            }
            else {
              return res.status(200).send({
                status: '',
                msg: 'this category is not exist',
                data: []
              })
            }
          })
      })
      .catch((error) => {
        return res.status(500).send({
          status: 'failed',
          msg: '',
          data: error
        })
      })
  }

  mongoConnect()

}



