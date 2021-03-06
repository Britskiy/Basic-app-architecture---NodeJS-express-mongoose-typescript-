const config = require("../config");

import * as express from 'express';
import redis = require('redis');
import { IncomingHttpHeaders } from 'http';

export class Auth {

    static redisClient = redis.createClient(config.redis_port);
    static TOKEN_EXPIRATION_SEC = config.TOKEN_EXPIRATION * 60;
    static secretToken = config.secretToken;

    public static connect(config: any) {
        this.redisClient = redis.createClient(config.redis_port);
        this.TOKEN_EXPIRATION_SEC = config.TOKEN_EXPIRATION * 60;
        this.secretToken = config.secretToken;
    }
    public static getToken(headers:IncomingHttpHeaders): string {
        if (headers && headers.authorization) {
            var authorization = headers.authorization;
            var part = authorization.split(' ');

            if (part.length == 2) {
                return part[1];
            }
            else {
                return '';
            }
        }
        else {
            return '';
        }
    };

    public static verifyTokenFromWeb(req: express.Request, res: express.Response): any {
        var token = Auth.getToken(req.headers);
        Auth.redisClient.get(token, (err, reply) => {
            if (err)
                return res.status(200).send({ isError: true, text: err });
            else if (reply)
                return res.status(200).send({ isError: true, text: 'no token found' });
            else
                return res.status(200).send({ isError: false, text: 'success' });
        });
    };

    public static verifyToken(req: express.Request, res: express.Response, next: any) {
        var token = Auth.getToken(req.headers);
        Auth.redisClient.get(token, function(err, reply) {
            if (err) {
                console.log(err);
                return res.send(500);
            }
            if (reply) {
                res.send(401);
            }
            else {
                next();
            }
        });
    };

    public static expireToken(headers:IncomingHttpHeaders): void {
        var token = Auth.getToken(headers);
        if (token != null) {
            Auth.redisClient.set(token, "{ is_expired: true }");
            Auth.redisClient.expire(token, Auth.TOKEN_EXPIRATION_SEC);
        }
    };
}
