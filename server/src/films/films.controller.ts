import { Request, Response } from 'express';

class FilmsController {
  find(_: Request, res: Response) {
    res.send([
      {
        id: '0ffe6d39-aad8-4540-a218-6b4ceadd9740',
        type: ['Film'],
        title: 'Avatar',
        genres: ['Sci-Fi', 'Action'],
      },
    ]);
  }
}

export { FilmsController };
