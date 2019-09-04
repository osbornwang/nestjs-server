import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken, getEntityManagerToken } from '@nestjs/typeorm'
import { AccountService } from '../../src/feature/account/account.service'
import { Repository, EntityManager } from 'typeorm'
import { UserEntity } from '../../src/feature/account/entity/user.entity'
import { WechatService } from '../../src/shared/services/wechat/wechat.service'
import { OldUserEntity } from '../../src/feature/account/entity/old-user.entity'
import { GetUserInfoDto } from '../../src/feature/account/dto/userInfo.dto'
import { AuthService } from '../../src/feature/authentication/auth.service'
import {
  ChangedMockUserResponseMock,
  UpdatedUserInfoMock,
  UserMock,
  UserResponseMock,
  WXSessionMock,
} from '../mock/user.mock'
import { UserTagService } from '../../src/feature/user-tag/user-tag.service'
import { UserTagMock } from '../mock/tag.mock'

describe('AccountService', () => {
  let accountService: AccountService
  let wechatService: WechatService
  let userTagService: UserTagService
  let userRepository: Repository<UserEntity>
  let oldUserRepository: Repository<OldUserEntity>

  const userInfo: GetUserInfoDto = { code: 'test code' }

  const mockUser: Promise<UserEntity> = Promise.resolve(UserMock)

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne() {
              return null
            },
            save() {
              return null
            },
            update() {
              return null
            },
          },
        },
        {
          provide: getRepositoryToken(OldUserEntity),
          useClass: Repository,
        },
        {
          provide: getEntityManagerToken(),
          useClass: EntityManager,
        },
        {
          provide: WechatService,
          useValue: {
            getWXSession() {
              return null
            },
          },
        },
        {
          provide: UserTagService,
          useValue: {
            findByUserId() {
              return UserTagMock.user_tag
            },
          },
        },
        {
          provide: AuthService,
          useValue: {
            createToken() {
              return null
            },
          },
        },
      ],
    }).compile()

    accountService = module.get<AccountService>(AccountService)
    wechatService = module.get<WechatService>(WechatService)
    userTagService = module.get<UserTagService>(UserTagService)
    userRepository = module.get(getRepositoryToken(UserEntity))
    oldUserRepository = module.get(getRepositoryToken(OldUserEntity))
  })

  it('should not get user info when code is empty', () => {
    const userInfoDto: GetUserInfoDto = { code: '' }
    return expect(accountService.getUserInfo(userInfoDto)).rejects.toThrow(
      'Code cannot be empty',
    )
  })

  it('should get user info successfully when if user exists', () => {
    jest.spyOn(wechatService, 'getWXSession').mockReturnValue(WXSessionMock)
    jest.spyOn(userRepository, 'findOne').mockReturnValue(mockUser)
    return expect(accountService.getUserInfo(userInfo)).resolves.toEqual(
      UserResponseMock,
    )
  })

  it('should get user info successfully when if user does not exist', () => {
    jest.spyOn(wechatService, 'getWXSession').mockReturnValue(WXSessionMock)
    jest.spyOn(userRepository, 'save').mockReturnValue(mockUser)
    jest.spyOn(userRepository, 'findOne').mockReturnValue(mockUser)
    return expect(accountService.getUserInfo(userInfo)).resolves.toEqual(
      UserResponseMock,
    )
  })

  it('should update user info successfully', () => {
    const changedMockUser: Promise<UserEntity> = Promise.resolve(UserMock)

    jest.spyOn(userRepository, 'findOne').mockReturnValue(changedMockUser)
    return expect(
      accountService.updateUserInfo(UpdatedUserInfoMock),
    ).resolves.toEqual(ChangedMockUserResponseMock)
  })
})
