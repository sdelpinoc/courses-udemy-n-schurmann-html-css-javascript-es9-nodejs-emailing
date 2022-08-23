import { Router } from 'express';

import { sendEmail } from '../controllers/emailing.js';

export const router = Router();

router.post('/send', sendEmail);