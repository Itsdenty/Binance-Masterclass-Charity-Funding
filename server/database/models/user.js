import bcrypt from 'bcrypt';

const user = (mongoose, connection) => {
  // const Schema = { mongoose };

  const UserDefinition = {
      phone_number: { type: String, unique: true, required: true },
      email: { type: String, unique: true },
      username: { type: String },
      password: { type: String, required: true },
      blocked: { type: Boolean, default: false },
      role: { type: mongoose.Schema.ObjectId, ref: 'Role' },
      permissions: [{ type: String }],
      last_login: { type: Date },
      login_count: { type: Number },
      deleted_at: { type: Date, default: null }
    },

    UserSchema = new mongoose.Schema(UserDefinition, {
      collection: 'users',
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });
  UserSchema.methods.comparePassword = password => bcrypt.compareSync(password, this.password);

  UserSchema.pre('save', (next) => {
    if (this.password) this.password = bcrypt.hashSync(this.password);
    next();
  });

  UserSchema.pre('update', (next) => {
    console.log(this._update);
    if (this._update.$set.password) {
      this._update.$set.password = bcrypt.hashSync(this._update.$set.password);
    }
    next();
  });

  return connection.model('User', UserSchema);
};

export default user;
