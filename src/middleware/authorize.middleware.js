const express = require('express');
// ham nay se nhan mot tham so truyen vao vd: admin, user, editor
// sau do ra kiem ra xem vai tro cua nguoi truy cap (role ở user request) có được phép truy cập vào tài nguyên không
//ví dụ req.user.role = user, requireRole = editor thì không được phép chỉnh sửa tài nguyên 
const authorize = (requiredRole) => (req, res, next) => {
    if (req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden: You do not have access to this resource' });
    }
    next();
};

module.exports = authorize;
