import express, { Application, Request, Response, NextFunction } from 'express';
import ErrorType, { handleError } from './utils/error';
import { slackEvents } from './api/providers/slack';
import slackRoutes from './api/routes/slack';
import './api/providers/discord';
const app: Application = express();

// app.use(express.json());
// app.use(express.urlencoded({
//   extended: true
// }));

app.use('/slack/events', slackEvents.expressMiddleware());


app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   res.send('healthy')
// });

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use('/slack-api', slackRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error: ErrorType, req: Request, res: Response, next: NextFunction) => {
  handleError(error, res);
});

app.listen(3000, () => console.log('started'))