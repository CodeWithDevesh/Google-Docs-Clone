const mongoose = require('mongoose')
const uri = "mongodb+srv://deveshagarwal652005:Devesh652005@docdata.3ygto.mongodb.net/?retryWrites=true&w=majority&appName=DocData"
const Document = require("./Document")
const defaultValue = ""
// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
const clientOptions = {}
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);

const io = require('socket.io')(3001, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"],
    },
})

io.on("connection", socket => {
    socket.on('get-document', async documentId => {
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        socket.emit('load-document', document.data)

        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        socket.on("save-document", async data => {
            await Document.findByIdAndUpdate(documentId, {data})
        })
    })
})



async function findOrCreateDocument(id){
    if(id == null) return ""
    console.log(id)
    const document = await Document.findById(id)
    if(document) return document
    return await Document.create({_id: id, data: defaultValue})
}
