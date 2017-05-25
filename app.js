
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import hbs from 'hbs';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import route from './router/route';
import router from './router';

const app = express();

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'static')));

//安全设置，
//禁用x-powered-by 头
//禁止任何frame,iframe,xss protections
app.use(helmet());

app.use('/', route)
app.use('/api', router)

module.exports = app;