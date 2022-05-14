module.exports = mongoose => {
  var schemaCour = mongoose.Schema(
    {
      titre: String,
      description: String,
      enseignants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "enseignant"
      }
    ]
    },
    { timestamps: true }
  );
  schemaCour.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Cour = mongoose.model("Cour", schemaCour);
  return Cour;
};