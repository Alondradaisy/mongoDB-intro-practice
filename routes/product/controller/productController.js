const e = require('express');
const Product = require('../model/Product');

module.exports = {
    createProduct: function(body, callback) {
        body.save(function(err, payload) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, payload)
            }
        });
    }
    getAllProducts: function(callback) {
        Product.find({}, function(err, payload) {
            if(err) {
                callback(err, null)
            } else {
                callback(null, payload);
            }
        });
    },

    getProductByID: function(id, callback) {
        Product.findById({ _id:id }, function(err, payload) {
            if (err) {
                callback(err, null)
            } else {
                callback(null, payload);
            }
        });
    },

    updateProductByID: function(id, body, callback) {
        Product.findByIdAndUpdate ({ _id:id }, body, { new: true}, function(err, updatedPayload) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, updatedPayload);
            };
        });
    },

    deleteProductByID: function(id, callback) {
        Product.findByIdAndRemove({ _id:id }, function(err, deletedPayload) {
            if(err) {
                callback(err, null);
            } else {
                callback(null, deletedPayload);
            }
        });
    },
}
