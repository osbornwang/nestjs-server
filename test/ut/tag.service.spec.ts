import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { InsertResult, Repository } from 'typeorm'

import {
  ActivitySearchTagParamMock,
  ActivitySearchTagResponseMock,
  ActivityTagRelationMock,
  AddTagParamMock,
  SearchTagParamMock,
  SearchTagResponseMock,
  SearchTagResultsMock,
  UserTagMock,
} from '../mock/tag.mock'
import { TagService } from '../../src/feature/tag/tag.service'
import { TagEntity } from '../../src/feature/tag/entity/tag.entity'
import { CommonSuccessResponseMock } from '../mock/common-response.mock'

describe('TagService', () => {
  let tagService: TagService
  let tagRepository: Repository<TagEntity>
  const insertResultMock: Promise<InsertResult> = Promise.resolve({
    raw: 1,
    identifiers: [],
    generatedMaps: [],
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getRepositoryToken(TagEntity),
          useClass: Repository,
        },
      ],
    }).compile()

    tagService = module.get<TagService>(TagService)
    tagRepository = module.get(getRepositoryToken(TagEntity))
  })

  it('should be return success after add tag successful', () => {
    jest.spyOn(tagRepository, 'insert').mockReturnValue(insertResultMock)
    expect(tagService.addTag(AddTagParamMock)).resolves.toEqual(
      CommonSuccessResponseMock,
    )
  })

  it('should return SearchTagResponse Obj when search tag successfully', () => {
    const whereSpy = jest.fn().mockReturnThis()
    const getCountSpy = jest.fn().mockReturnValue(21)
    jest.fn(() => ({
      createQueryBuilder: jest.fn(() => ({
        where: whereSpy,
        getCount: getCountSpy,
      })),
    }))

    jest
      .spyOn(tagRepository, 'query')
      .mockReturnValue(SearchTagResultsMock.data)
    expect(tagService.searchTag(SearchTagParamMock)).resolves.toEqual(
      SearchTagResponseMock,
    )
  })

  it('should return ActivitySearchTagResponse Obj when ActivitySearchTag run successfully', () => {
    const whereSpy = jest.fn().mockReturnThis()
    const selectSpy = jest.fn().mockReturnThis()
    const leftJoinSpy = jest.fn().mockReturnThis()
    const getManySpy = jest.fn().mockReturnValue(UserTagMock.user_tag)
    jest.fn(() => ({
      createQueryBuilder: jest.fn(() => ({
        where: whereSpy,
        select: selectSpy,
        leftJoin: leftJoinSpy,
        getMany: getManySpy,
      })),
    }))

    expect(
      tagService.activitySearchTag(ActivitySearchTagParamMock),
    ).resolves.toEqual(ActivitySearchTagResponseMock)
  })
})
