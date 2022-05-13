module.exports = mongoose => {
  var schemaUser = mongoose.Schema(
    {
      username: String,
      password: String,
    },
    { timestamps: true }
  );
  schemaUser.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });
  const User = mongoose.model("user", schemaUser);
  return User;
};