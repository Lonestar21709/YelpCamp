var mongoose = require("mongoose");


var commentSchema = new mongoose.Schema({
    text: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User" //the model we are going to associate with this id
            
        },
        username: String
    }
});


module.exports = mongoose.model("Comment", commentSchema);
//singular version - Comment -> mongo db -> comments