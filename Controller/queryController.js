import initDb from '../db.js';
import { QueryTypes } from 'sequelize';

// ⚠️  DEV/ADMIN ONLY - never expose this without role protection in production
const runQuery = async (req, res) => {
    try {
        // Extra guard: only allow users with role === 'admin'
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                status: 'Failed',
                message: 'Access denied. Admin role required.'
            });
        }

        const { query } = req.body;

        if (!query || typeof query !== 'string' || query.trim() === '') {
            return res.status(400).json({
                status: 'Failed',
                message: 'Query is required'
            });
        }

        const trimmed = query.trim();

        // Get sequelize instance from any model — every Sequelize model exposes .sequelize
        const models = await initDb();
        const sequelize = models.sequelize 
            || (models.User && models.User.sequelize)
            || (models.Event && models.Event.sequelize);

        if (!sequelize) {
            return res.status(500).json({
                status: 'Failed',
                message: 'Could not obtain database connection from models.'
            });
        }

        const upperQuery = trimmed.toUpperCase();
        const isSelect = upperQuery.startsWith('SELECT')
            || upperQuery.startsWith('SHOW')
            || upperQuery.startsWith('DESCRIBE')
            || upperQuery.startsWith('EXPLAIN');

        if (isSelect) {
            const results = await sequelize.query(trimmed, { type: QueryTypes.SELECT });
            return res.status(200).json({
                status: 'Success',
                type: 'SELECT',
                rowCount: results.length,
                data: results
            });
        } else {
            const [, metadata] = await sequelize.query(trimmed, { type: QueryTypes.RAW });
            const affected = metadata?.affectedRows ?? metadata ?? 0;
            return res.status(200).json({
                status: 'Success',
                type: 'MUTATION',
                affectedRows: affected,
                message: `Query executed successfully. ${affected} row(s) affected.`
            });
        }

    } catch (error) {
        console.error('Query runner error:', error);
        return res.status(500).json({
            status: 'Failed',
            message: error.message || 'Query execution failed'
        });
    }
};

export default { runQuery };