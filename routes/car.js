const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Car = require('../models/car');

// Route tạo mới Ô tô
router.post('/create', [
    body('MaXe').notEmpty().withMessage('Mã Xe không được để trống'),
    body('Name').isAlpha().withMessage('Tên Xe phải là chữ'),
    body('Price').isNumeric().withMessage('Giá phải là số'),
    body('Year').isInt({ min: 1980, max: 2024 }).withMessage('Năm sản xuất phải từ 1980 đến 2024'),
    body('Brand').notEmpty().withMessage('Hãng không được để trống'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newCar = new Car(req.body);
    newCar.save().then(() => {
        res.redirect('/cars/list');
    }).catch(err => {
        res.status(500).send("Lỗi khi lưu dữ liệu");
    });
});
router.get('/list', (req, res) => {
    Car.find().then(cars => {
        res.json(cars);
    }).catch(err => {
        res.status(500).send("Lỗi khi lấy danh sách ô tô");
    });
});


module.exports = router;
