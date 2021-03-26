const role = (mongoose, connection) => {
    const RoleDefinition = {
        name: { type: String, required: true },
        displayName: { type: String },
        description: { type: String },
        permissions: [{ type: String }],
      },
  
      RoleSchema = new mongoose.Schema(RoleDefinition, {
        collection: 'roles',
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
      });
  
    return connection.model('Role', RoleSchema);
  };
  
  export default role;  