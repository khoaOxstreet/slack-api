
import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();
import { sendMessage } from '../providers/slack';

const ROUTE_NAME = 'slack';
/**
 * GET METHOD
 */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.query as any;
  sendMessage('testbot', message);
  res.status(200).json({
    message: `Handling GET requests to /${ROUTE_NAME} success`
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