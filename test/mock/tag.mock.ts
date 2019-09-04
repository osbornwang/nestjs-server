import * as Mock from 'mockjs'

export const ActivityTagRelationMock = Mock.mock({
  'activity_id|1-10': 1,
  'tag_id|1-10': 1,
  'id|1-10': 1,
})

export const AddTagParamMock = Mock.mock({
  'tag_names|1-10': ['@name'],
})

export const SearchTagParamMock = Mock.mock({
  limit: 30,
  offset: 0,
  keyword: '',
})

export const UserTagMock = Mock.mock({
  'user_tag|1-10': [
    {
      id: '@id',
      name: '@name',
    },
  ],
})

export const ActivitySearchTagParamMock = Mock.mock({
  'type|1': ['FUTURE', 'PAST'],
})

export const SearchTagResultsMock = Mock.mock({
  'data|1-10': [
    {
      id: '@id',
      name: '@name',
      create_time: '@datetime',
      update_time: '@datetime',
      create_by: '@name',
    },
  ],
})

export const SearchTagResponseMock = Mock.mock({
  total: 21,
  tags: {
    total: 21,
    tags: [...SearchTagResultsMock.data],
  },
})

export const ActivitySearchTagResponseMock = Mock.mock({
  tags: [...UserTagMock.user_tag],
  total: 9,
})
