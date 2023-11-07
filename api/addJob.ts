// pages/api/addJob.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const addJobHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const response = await fetch('YOUR_CLOUD_FUNCTION_URL/addJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req.body),
            });

            if (response.ok) {
                const data = await response.json();
                res.status(200).json(data);
            } else {
                res.status(response.status).json({ message: 'Failed to add job' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default addJobHandler;
