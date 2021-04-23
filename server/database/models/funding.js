const funding = (mongoose, connection) => {
  // const Schema = { mongoose };
  const FundingDefinition = {
      user: { type: mongoose.Schema.ObjectId, ref: 'User' },
      address: { type: String },
      proof: { type: String },
      description: { type: String },
      target_amount: { type: Number, required: true },
      pk: { type: String, required: true },
      raised_amount: { type: Number },
      votes: [{ type: String }],
      is_activated: {type: Boolean, default: false},
      vote_count: {type: Number, default: 0}
    },

    FundingSchema = new mongoose.Schema(FundingDefinition, {
      collection: 'fundings',
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

  return connection.model('Funding', FundingSchema);
};

export default funding;
