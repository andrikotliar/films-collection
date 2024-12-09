import { ObjectId } from 'mongoose';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthCredentials } from './login-payload';

interface IAuthService {
  login(
    payload: AuthCredentials,
  ): Promise<{ accessToken: string; userId: ObjectId } | null>;

  register(payload: AuthCredentials): Promise<{ id: string; username: string }>;
}

interface IAuthController {
  login(request: FastifyRequest, reply: FastifyReply): Promise<unknown>;
  register(request: FastifyRequest, reply: FastifyReply): Promise<unknown>;
}

export { IAuthService, IAuthController };
