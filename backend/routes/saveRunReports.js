const express = require('express');
const RunReportDashboard = require('../model/RunReportDashboard');

const router = express.Router();

router.post('/run-report', async (req, res) => {
    const {
        userName, 
        date,
        time,
        targetTime, 
        movingTime, 
        timeDifference, 
        distance, 
        avgPace, 
        elevationGain, 
        rating, 
        stars,
        mapData
    } = req.body;

    const runReport = new RunReportDashboard();
    await runReport.connect();

    try {
        const report = {
            userName,
            date,
            time,
            targetTime,
            movingTime,
            timeDifference,
            distance,
            avgPace,
            elevationGain,
            rating,
            stars,
            mapData
        };
        
        // Submit the report
        await runReport.submitReport(report);
        res.status(200).json({ message: 'Run report recorded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to record run report.' });
    } finally {
        await runReport.close();
    }
});

router.get('/run-report/:userName', async (req, res) => {
    const { userName } = req.params;
    const runReport = new RunReportDashboard();
    await runReport.connect();

    try {
        // Fetch run reports for the specified user
        const reports = await runReport.getReportsByUser(userName);
        
        if (reports.length === 0) {
            return res.status(404).json({ message: 'No run reports found for this user.' });
        }
        
        res.status(200).json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve run reports.' });
    } finally {
        await runReport.close();
    }
});

module.exports = router;
