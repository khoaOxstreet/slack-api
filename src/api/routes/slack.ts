
import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();
import { sendMessage, sendMarkdownMessage, sendMarkDownTableMessage } from '../providers/slack';
import { buildBlockMarkdownSection } from '../providers/slack-lib';
import { getPrices, getOffers, getPrice, getOffer } from '../providers/price-engine';
const ROUTE_NAME = 'slack';
/**
 * GET METHOD
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const { message, channel_id = 'testbot' } = req.query as any;
  sendMessage(channel_id, message);
  res.status(200).json({
    message: `Handling GET requests to /${ROUTE_NAME} success`
  })
});

/**
 * POST METHOD
 */
 router.get('/send-markdown-message', (req: Request, res: Response, next: NextFunction) => {
  console.log('data', req.body);
  const { channel } = req.query as any;
  // sendMessage(channel, `I got your command ${text}`);
  sendMarkdownMessage(channel);
  res.status(200).json({
    message: `Handling POST requests to /${ROUTE_NAME}`,
    ...req.body
  })
});

/**
 * POST METHOD
 */
router.post('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('data', req.body);
  
  res.status(200).json({
    message: `Handling POST requests to /${ROUTE_NAME}`,
    ...req.body
  })
});

/**
 * POST METHOD
 */
 router.post('/read-my-request', (req: Request, res: Response, next: NextFunction) => {
  console.log('data', req.body);
  const { channel_id = 'testbot', text } = req.body as any;
  sendMessage(channel_id, `I got your command ${text}`);
  res.status(200).json({
    message: `Handling POST requests to /${ROUTE_NAME}`,
    ...req.body
  })
});

router.post('/prices', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('prices data', req.body);
    const { channel_id = 'testbot', text, user_id } = req.body as any;
    const [sku, currency ] = text.split(' ');
    const skuNumber = sku.replace(/-/g, ' ').trim().toUpperCase();
    const title = `<@${user_id}> has requested prices from SKU: *${skuNumber}* ${currency ? `with CURRENCY *${currency}*` : ''}`;
    const result = await getPrices(skuNumber, currency);
    sendMarkDownTableMessage(channel_id, title, result);
    res.status(200).json({
      message: `Handling POST requests to /${ROUTE_NAME}`,
      ...req.body
    })
  } catch (error) {
    console.log('error', error);
    const { message } = error;
    res.status(400).send({ message });
  }
});

router.post('/price', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('prices data', req.body);
    const { channel_id = 'testbot', text, user_id } = req.body as any;
    const [sku, size, currency ] = text.split(' ');
    const skuNumber = sku.replace(/-/g, ' ').trim();
    const title = `<@${user_id}> has requested price from SKU: *${skuNumber}* SIZE *${size}* ${currency ? ` CURRENCY *${currency}*` : ''}`;
    const result = await getPrice(skuNumber, size, currency);
    sendMarkDownTableMessage(channel_id, title, [result]);
    res.status(200).json({
      message: `Handling POST requests to /${ROUTE_NAME}`,
      ...req.body
    })
  } catch (error) {
    console.log('error', error);
    const { message } = error;
    res.status(400).send({ message });
  }
});

router.post('/offers', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('prices data', req.body);
    const { channel_id = 'testbot', text, user_id } = req.body as any;
    const [sku, currency ] = text.split(' ');
    const skuNumber = sku.replace(/-/g, ' ').trim();
    const title = `<@${user_id}> has requested offers from SKU: *${skuNumber}* ${currency ? `with CURRENCY *${currency}*` : ''}`;
    const result = await getOffers(skuNumber, currency);
    sendMarkDownTableMessage(channel_id, title, result);
    res.status(200).json({
      message: `Handling POST requests to /${ROUTE_NAME}`,
      ...req.body
    })
  } catch (error) {
    console.log('error', error);
    const { message } = error;
    res.status(400).send({ message });
  }
});

router.post('/offer', async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('prices data', req.body);
    const { channel_id = 'testbot', text, user_id } = req.body as any;
    const [sku, size, currency ] = text.split(' ');
    const skuNumber = sku.replace(/-/g, ' ').trim();
    const title = `<@${user_id}> has requested offer from SKU: *${skuNumber}* SIZE ${size} ${currency ? `with CURRENCY *${currency}*` : ''}`;
    const result = await getOffer(skuNumber, size, currency);
    sendMarkDownTableMessage(channel_id, title, [result]);
    res.status(200).json({
      message: `Handling POST requests to /${ROUTE_NAME}`,
      ...req.body
    })
  } catch (error) {
    console.log('error', error);
    const { message } = error;
    res.status(400).send({ message });
  }
});





/**
 * PUT METHOD
 */
router.put('/', (req: Request, res: Response, next: NextFunction) => {
  console.log('data', req.body);
  
  res.status(200).json({
    message: `Handling PUT requests to /${ROUTE_NAME}`,
    ...req.body
  })
});

/**
 * GET BY ID
 */
router.get('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  res.status(200).json({
    message: `Handling GET requests to /${ROUTE_NAME}/${id}`
  })
});

/**
 * PATH :ID
 */
router.patch('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  res.status(200).json({
    message: `Handling UPDATE requests to /${ROUTE_NAME}/${id}`
  })
});

/**
 * DELETE :ID
 */
router.delete('/:id', (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  res.status(200).json({
    message: `Handling DELETE requests to /${ROUTE_NAME}/${id}`
  })
});

export default router;