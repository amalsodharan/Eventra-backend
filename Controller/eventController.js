import initdb from '../db.js';

const addEvent = async (req, res) => {
    try {
        const { Event } = await initdb();
        const input = req.body;

        if (!input.end_date) {
            input.end_date = '0000-00-00';
        }
        if (input.is_deleted === undefined) {
            input.is_deleted = false;
        }
        input.user_id = req.user.id;

        const newEvent = await Event.create(input);
        res.status(201).json({
            status: "Success",
            message: "Event created successfully",
            data: newEvent
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: error.message
        });
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

const editEvent = async (req, res) => {
    try {
        const { Event } = await initdb();
        const { id } = req.params;
        const input = req.body;

        const event = await Event.findOne({ where: { id: id, is_deleted: false } });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await Event.update(input, { where: { id: id } });

        const updatedEvent = await Event.findOne({ where: { id: id } });

        res.status(200).json(updatedEvent);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const { Event } = await initdb();
        const { id } = req.params;

        const event = await Event.findOne({ where: { id: id, is_deleted: false } });

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        await Event.update(
            { is_deleted: true },
            { where: { id: id } }
        );

        res.status(200).json({ message: "Event deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { addEvent, getEvents, editEvent, deleteEvent };