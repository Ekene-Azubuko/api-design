import app from '../server';
import supertest from 'supertest';

describe('GET /', () => {
    it('should return a message', async () => {
        const res = await supertest(app)
        .get('/')

        expect(res.body.message).toBe('hello world');
    })
})