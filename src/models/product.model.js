
const { Schema, model, Types, mongoose } = require("mongoose")

class Product {
  constructor() {
    const schema = new Schema({
      name: String,
      platform: String,
      price: Number,
      description: String,
      image: String
    })

    this.model = model("product", schema)
  }

  async getAll() {
    const data = await this.model.find({})
      .lean()
    
    return data.map((product) => ({
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      platform: product.platform
    }))
  }

  async save(obj) {
    const product = await this.model.create(obj)
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      platform: product.platform
    }
  }


  async delete(id) {
    return await this.model.deleteOne({ _id: mongoose.Types.ObjectId(id) })
  }

  async getById(id) {
    const product =  await this.model.findById(mongoose.Types.ObjectId(id)).lean()
    return {
      id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      platform: product.platform
    }
  }
}

module.exports = new Product()