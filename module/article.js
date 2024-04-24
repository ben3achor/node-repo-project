mongoose=require("mongoose");
const schema=mongoose.Schema;
const ArticleSchema = new schema({
  title:String,
  body:String,
  numbreoflikes:Number,
});

const ArticleModel = mongoose.model("Article", ArticleSchema);
module.exports= ArticleModel;
