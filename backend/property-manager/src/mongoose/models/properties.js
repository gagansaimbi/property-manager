const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    shopNo: {
        type: String,
        required: true,
        match: /^(?:[1-9][0-9]?|100)[A-Z]$/
    },
    floorNo: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    leaseAmount: {
        type: Number,
        required: true,
        min: 200000,
        max: 5000000
    },
    occupied: {
        type: Boolean,
        default: false
    },
    tenantName: {
        type: String,
        default: ""
    },
    tenantMobile: {
        type: Number,
        default: null
    },
    leaseStartDate: {
        type: String,
        default: ""
    },
    leaseEndDate: {
        type: String,
        default: ""
    }
}, {
    versionKey: false
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
