import initdb from '../db.js';

const addEvent = async (req, res) => {
    try {
        const { Event } =  await initdb();
        const input = req.body;
        if (!input.end_date) {
            input.end_date = '0000-00-00';
        }
        if (input.is_deleted === undefined) {
            input.is_deleted = false;
        }
        const newEvent = await Event.create(input);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getEvents = async (req, res) => {
    try {
        const { Event } =  await initdb();
        const events = await Event.findAll({ where: { is_deleted: false } });
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { addEvent, getEvents };