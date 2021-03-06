

const { Schema, model, Types, mongoose } = require("mongoose")
const moment = require('moment')

class Pedido {
  constructor() {
    const schema = new Schema({
      userId: String,
      total: { type: Number, default: 0 },
      created: { type: Date, default: Date.now },
      enviado: Boolean
    })

    this.model = model("pedido", schema)
  }

  async getAll() {
    const data = await this.model.find({})
      .lean()
    
    return data.map((pedido) => ({
      id: pedido._id.toString(),
      userId: pedido.userId,
      total: pedido.total,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado ? 'Si' : 'No'
    }))
  }

  async save(obj) {
    const pedido = await this.model.create(obj)
    return {
      id: pedido._id.toString(),
      userId: pedido.userId,
      total: pedido.total,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado ? 'Si' : 'No'
    }
  }

  async delete(id) {
    return await this.model.deleteOne({ _id: mongoose.Types.ObjectId(id) })
  }

  async getById(id) {
    const pedido =  await this.model.findById(mongoose.Types.ObjectId(id)).lean()
    return {
      id: pedido._id.toString(),
      userId: pedido.userId,
      total: pedido.total,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado ? 'Si' : 'No'
    }
  }

  async getByUser(id) {
    const pedido =  await this.model.findOne({ userId: id }).lean()
    
    if (!pedido) {
      return {}
    }

    return {
      id: pedido._id.toString(),
      userId: pedido.userId,
      total: pedido.total,
      created: moment(pedido.created).format('DD-MM-YYYY HH:mm'),
      enviado: pedido.enviado ? 'Si' : 'No'
    }
  }

  async updateEnviarPedido(id, enviado) {
    const pedido =  await this.model.findById(id)

    pedido.enviado = enviado

    await pedido.save()
  }
}

module.exports = new Pedido()