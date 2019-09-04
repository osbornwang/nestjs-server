import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/api/v1/activity.Activity/SearchActivity (POST)', () => {
    return request(app.getHttpServer())
      .post('/activity.Activity/SearchActivity')
      .send({
        condition: {
          type: 'LIST_PAGE',
          user_id: 0,
          tag_ids: [],
          time_type: 'FUTURE',
        },
        tag_ids: [],
        time_type: 'FUTURE',
        type: 'LIST_PAGE',
        user_id: 0,
        limit: 20,
        offset: 0,
      })
      .expect(201)
  })
})
