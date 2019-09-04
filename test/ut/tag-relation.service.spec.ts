import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { InsertResult, Repository } from 'typeorm'

import { ActivityTagRelationService } from '../../src/feature/tag-relation/tag-relation.service'
import { ActivityTagRelationEntity } from '../../src/feature/tag-relation/entity/activity-tag-relation.entity'
import { ActivityTagRelationMock } from '../mock/tag.mock'

describe('TagRelationService', () => {
  let tagRelationService: ActivityTagRelationService
  let activityTagRelationRepository: Repository<ActivityTagRelationEntity>
  const insertResultMock: Promise<InsertResult> = Promise.resolve({
    raw: 1,
    identifiers: [],
    generatedMaps: [],
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityTagRelationService,
        {
          provide: getRepositoryToken(ActivityTagRelationEntity),
          useClass: Repository,
        },
      ],
    }).compile()

    tagRelationService = module.get<ActivityTagRelationService>(
      ActivityTagRelationService,
    )
    activityTagRelationRepository = module.get(
      getRepositoryToken(ActivityTagRelationEntity),
    )
  })

  it('should be return empty array when tagIds not exit or length === 0', () => {
    expect(tagRelationService.getDbTagRelationsByTagIds([])).resolves.toEqual(
      [],
    )
  })

  it('should be return number when activityTagRelation insert successful', () => {
    jest
      .spyOn(activityTagRelationRepository, 'insert')
      .mockReturnValue(insertResultMock)
    expect(
      tagRelationService.addActivityTagRelation(ActivityTagRelationMock),
    ).resolves.toEqual(1)
  })
})
