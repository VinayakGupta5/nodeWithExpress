const Category = require('../../models/CategoryModel')
const connectToDb = require('../../conn/connectMongoose')

exports.CreateMainCategory = async (req, res, next) => {

  const parent = req.body.parent;
  const name = req.body.name.toLowerCase();
  console.log("name", name)

  if (name === '' || name === null || name === undefined) {
    return res.status(200).send({
      status: 'failed',
      msg: 'Category name is required',
      data: []
    });
  }
  if (parent === '' || parent === undefined) {
    return res.status(200).send({
      status: 'failed',
      msg: 'Parent category is required',
      data: []
    });
  }

  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {

        const category = new Category({ name, parent });
        Category.findOne({ name: name })
          .then((found) => {
            if (found) {
              return res.status(200).send({
                status: 'failed',
                msg: 'Category already exists',
                data: []
              });
            }
            else {
              category.save()
                .then(result => {
                  return res.status(201).send({
                    status: 'success',
                    msg: '',
                    data: result
                  });
                })
                .catch((err) => {
                  return res.status(400).send({
                    status: 'failed',
                    msg: err.message,
                    data: []
                  });
                })

            }
          })
          .catch(err => {
            return res.status(400).send({
              status: 'failed',
              msg: err.message,
              data: []
            });
          })

      })
  }

  mongoConnect()
}


exports.CreateSubCategory = async (req, res) => {

  const parentId = req.body.parentId;
  const name = req.body.name.toLowerCase();


  if (name === '' || name === null || name === undefined) {
    return res.status(200).send({
      status: 'failed',
      msg: 'Category name is required',
      data: []
    });
  }
  if (parent === '' || parent === null || parent === undefined) {
    return res.status(200).send({
      status: 'failed',
      msg: 'Parent category is required',
      data: []
    });
  }

  const createSubCategory = () => {
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
  }

  const databaseName = req.userData.connectString
  async function mongoConnect() {
    await connectToDb(databaseName)
      .then(async (result) => {
        Category.findOne({ name: name })
          .then((found) => {

            if (found) {
              if (found.parent.equals(parentId)) {
                console.log("running",)
                return res.status(200).send({
                  status: 'failed',
                  msg: 'Category already exists',
                  data: []
                });
              }
              else {
                createSubCategory()
              }
            }
            else {
              createSubCategory()
            }
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
          return res.status(500).send({
            status: 'failed',
            msg: err.message,
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

  if (id === '' || id === undefined || id === null) {
    return res.status(200).send({
      status: 'failed',
      msg: 'Category id is required',
      data: []
    });
  }

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
                status: 'failed',
                msg: 'this category is not exist',
                data: []
              })
            }
          })
      })
      .catch(err => {
        return res.status(500).send({
          status: 'failed',
          msg: err.message,
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

  if (id === undefined || id === null || id === '') {
    return res.status(200).send({
      status: 'failed',
      msg: 'Category id is required',
      data: []
    });
  }

  if (name === undefined || name === null || name === '') {
    return res.status(200).send({
      status: 'failed',
      msg: 'Category name is required',
      data: []
    });
  }

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
        return res.status(500).send({
          status: 'failed',
          msg: err.message,
          data: err
        })
      })
  }

  mongoConnect()
}

exports.getCategoryById = (req, res, next) => {
  const id = req.params._id;
  console.log("id: " + id)

  if (id === null || id === undefined || id === '') {
    return res.status(200).send({
      status: 'failed',
      msg: 'Category id is required',
      data: []
    });
  }

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
                status: 'failed',
                msg: 'this category is not exist',
                data: []
              })
            }
          })
      })
      .catch((err) => {
        return res.status(500).send({
          status: 'failed',
          msg: err.message,
          data: err
        })
      })
  }
  mongoConnect()
}