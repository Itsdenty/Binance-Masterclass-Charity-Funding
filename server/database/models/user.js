import bcrypt from 'bcrypt';

const user = (mongoose, connection) => {
  // const Schema = { mongoose };

  const UserDefinition = {
      email: { type: String, unique: true },
      address: { type: String },
      username: { type: String },
      password: { type: String, required: true },
      pk: { type: String, required: true },
      blocked: { type: Boolean, default: false },
      last_login: { type: Date },
      vote_allowed: {type: Number, default: 10},
      vote_casted: {type: Number, default: 0}
    },

    UserSchema = new mongoose.Schema(UserDefinition, {
      collection: 'users',
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });
  UserSchema.methods.comparePassword = password => bcrypt.compareSync(password, this.password);

  UserSchema.pre('save', function (next) {
    console.log(this.password);
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
    next();
  });

  UserSchema.pre('update', function (next) {
    console.log(this._update);
    if (this._update.$set.password) {
      this._update.$set.password = bcrypt.hashSync(this._update.$set.password, 10);
    }
    next();
  });

  return connection.model('User', UserSchema);
};

export default user;
