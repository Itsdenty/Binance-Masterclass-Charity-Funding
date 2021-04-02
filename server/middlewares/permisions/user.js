import Transformer from '../../utils/transformer';
import PermissionList from '../../config/permission';

const UserPermission = {};

// admin permissions
UserPermission.canView = (req, res, next) => {
  if (!req.decodedToken) {
    return res.status(200).json(Transformer.transformResponse(0, 'No token found, how did you get to this point?'));
  }

  const permissionList = req.decodedToken.role.permissions,
    canView = permissionList.includes(PermissionList.READ_USER)
    || permissionList.includes(PermissionList.GLOBAL)
    || permissionList.includes(PermissionList.GLOBAL_USER);
  if (!canView) {
    return res.status(200).json(Transformer.transformResponse(0, 'You do not have the permission to perform this operation!'));
  }
  next();
};

UserPermission.canCreate = (req, res, next) => {
  if (!req.decodedToken) {
    return res.status(200).json(Transformer.transformResponse(0, 'No token found, how did you get to this point?'));
  }

  const permissionList = req.decodedToken.role.permissions,
    canCreate = permissionList.includes(PermissionList.WRITE_USER)
    || permissionList.includes(PermissionList.GLOBAL)
    || permissionList.includes(PermissionList.GLOBAL_USER);
  if (!canCreate) {
    return res.status(200).json(Transformer.transformResponse(0, 'You do not have the permission to perform this operation!'));
  }
  next();
};

UserPermission.canDelete = (req, res, next) => {
  if (!req.decodedToken) {
    return res.status(200).json(Transformer.transformResponse(0, 'No token found, how did you get to this point?'));
  }

  const permissionList = req.decodedToken.role.permissions,
    canDelete = permissionList.includes(PermissionList.GLOBAL)
    || permissionList.includes(PermissionList.GLOBAL_USER);
  if (!canDelete) {
    return res.status(200).json(Transformer.transformResponse(0, 'You do not have the permission to perform this operation!'));
  }
  next();
};

UserPermission.canUpdate = (req, res, next) => {
  if (!req.decodedToken) {
    return res.status(200).json(Transformer.transformResponse(0, 'No token found, how did you get to this point?'));
  }
  const permissionList = req.decodedToken.role.permissions,
    canUpdate = permissionList.includes(PermissionList.GLOBAL)
    || permissionList.includes(PermissionList.GLOBAL_USER);
  if (!canUpdate) {
    return res.status(200).json(Transformer.transformResponse(0, 'You do not have the permission to perform this operation!'));
  }
  next();
};


module.exports = UserPermission;
