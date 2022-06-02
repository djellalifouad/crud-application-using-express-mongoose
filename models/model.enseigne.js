module.exports = mongoose => {
  var schemaenseigne = mongoose.Schema(
    {
        ensignant: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "enseignant"
      },
      cour: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cour"
      },
      date: String,
    },
    { timestamps: true }
  );
  const Enseigne = mongoose.model("enseigne", schemaenseigne);
  return Enseigne;
};