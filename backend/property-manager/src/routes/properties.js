const express = require('express');
const router = express.Router();
const Property = require('../mongoose/models/properties');

// Create a new property
router.post('/properties', async (req, res) => {
    try {
        // Extract floorNo from shopNo
        const shopNo = req.body.shopNo;
        if (!shopNo || !/^(?:[1-9][0-9]?|100)[A-Z]$/.test(shopNo)) {
            return res.status(400).send({ error: 'Invalid shopNo format' });
        }

        const floorNo = parseInt(shopNo.match(/^\d+/)[0], 10);

        // Create new property object
        const property = new Property({
            ...req.body,
            floorNo
        });

        // Save property to the database
        await property.save();
        res.status(201).json({ message: 'Shop added' });
    } catch (e) {
        res.status(400).json({ message: 'error' });
    }
});

// Get properties with optional query parameters
router.get('/properties', async (req, res) => {
    const { leaseAmount, tenantName, occupied } = req.query;
    let filter = {};
    let sort = {};

    if (tenantName) {
        filter.tenantName = tenantName;
    }

    if (occupied !== undefined) {
        filter.occupied = occupied;
    }

    if (leaseAmount) {
        sort.leaseAmount = leaseAmount === 'asc' ? 1 : -1; // 1 for ascending, -1 for descending
    }

    try {
        const properties = await Property.find(filter).sort(sort);
        res.status(200).send(properties);
    } catch (e) {
        res.status(500).send(e);
    }
});

// Get a property by ID
router.get('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).send();
        }
        res.status(200).send(property);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.patch('/properties/:id', async (req, res) => {
    try {
        const currentPropertyValues = await Property.findById(req.params.id);
        if(currentPropertyValues.occupied){
            res.status(404).json({"type":"forbidden", "message":"occupied is already true"});
        } else {
        const id = req.params.id;
        const currentDate = new Date().toJSON().substring(0,10).split('-');
        const startDate = currentDate[2] + '-' + currentDate[1] + '-' + currentDate[0];
        const endDate = currentDate[2] + '-' + currentDate[1] + '-' + (Number(currentDate[0])+Number(req.body.leaseDuration)).toString();

        const property = await Property.findByIdAndUpdate(id, { tenantName: req.body.tenantName, 
            tenantMobile: req.body.tenantMobile, 
            leaseDuration: req.body.leaseDuration ,
            leaseStartDate: startDate,
            leaseEndDate: endDate,
            leaseAmount: currentPropertyValues.leaseAmount * req.body.leaseDuration,
            occupied: true
    });
        if (!property) {
            return res.status(404).json({"type":"Bad request"});
        }
        res.status(200).json({"type": "OK", "message":"Update succesfull"});
    }
    } catch (e) {
        res.status(500).send(e);
    }
});

// Delete a property
router.delete('/properties/:id', async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.params.id);

        if (!property) {
            return res.status(404).send();
        }

        res.status(200).send(property);
    } catch (e) {
        res.status(500).send(e);
    }
});

module.exports = router;