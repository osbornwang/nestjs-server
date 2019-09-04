import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import {
  SearchActivityTagDto,
  GetUserTagDto,
  AddTagDto,
  SearchHotActivityTagDto,
} from '../src/feature/tag/dto/tag.dto'

describe('Tag', () => {
  let app

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('add user tag', async () => {
    const tag_names = ['flashMan', '牛人']
    await request(app.getHttpServer())
      .post('/tag.TagController/deleteUserTag')
      .send({
        tag_names,
      })

    const dto: AddTagDto = {
      type: 'user',
      tag_names,
    }
    await request(app.getHttpServer())
      .post('/tag.TagController/addTag')
      .send(dto)

    const res = await request(app.getHttpServer())
      .post('/tag.TagController/searchUserTag')
      .send(dto)
    const tagNames: string[] = res.body.tags.map(x => x.name)
    expect(tagNames).toContain(tag_names[0])
    expect(tagNames).toContain(tag_names[1])
  })
})
