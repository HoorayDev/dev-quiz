import { Test, TestingModule } from '@nestjs/testing';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate a uuid', () => {
    const uuid = service.generateUUIDv4();
    expect(uuid).toBeDefined();
    expect(typeof uuid).toBe('string');
  });

  it('should sign payload and return a token', () => {
    const spySign = jest.spyOn(jwtService, 'sign');
    const payload = { id: 'uuid-v4', name: 'Test' };
    const token = service.signJWT(payload);
    expect(token).toBeDefined();
    expect(spySign).toHaveBeenCalledWith(
      { id: payload.id, name: payload.name },
      { secret: process.env.JWT_SECRET },
    );
    spySign.mockRestore();
  });

  // TODO: Fix Test Code
  // it('should verify a jwt token', async () => {
  //   const spyVerify = jest
  //     .spyOn(jwtService, 'verifyAsync')
  //     .mockImplementation(async () => Promise.resolve({}));
  //   const token =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InV1aWQtdjQiLCJuYW1lIjoiVGVzdCIsImlhdCI6MTY4NjAzNjAwNSwiZXhwIjoxNjg2MTIyNDA1fQ.QKG14mRyoa-15vVjtqA8TLiuwWUUZIywsiy59mXrQMg';
  //   await service.verifyJWT(token);
  //   expect(spyVerify).toHaveBeenCalledWith(token);
  //   spyVerify.mockRestore();
  // });
});
