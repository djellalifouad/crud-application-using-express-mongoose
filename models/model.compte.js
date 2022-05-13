module.exports = mongoose => {
  var schemaCompte = mongoose.Schema(
    {
      nccp: String,
      user : { type: mongoose.Schema.Types.ObjectId, ref: "user"}
    },
    { timestamps: true }
  );
schemaCompte.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const Compte = mongoose.model("compte", schemaCompte);
  return Compte;
};