import "reflect-metadata";
import { describe } from "node:test";
import ResetPasswordService from "../ResetPasswordService";
import FakeUsersRepository from "../../domain/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../../providers/HashProvider/fakes/FakeHashProvider";
import FakeUserTokenRepository from "../../domain/repositories/fakes/FakeUserTokenRepository";
import FakeDateProvider from "../../providers/DateProvider/fakes/FakeDateProvider";
import AppError from "@shared/erros/AppError";

let resetPassword: ResetPasswordService;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeHashProvider: FakeHashProvider;
let fakeDateProvider: FakeDateProvider;

describe("ResetPassword", () =>
{
  beforeEach(() =>
  {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeDateProvider = new FakeDateProvider();

    resetPassword = new ResetPasswordService(fakeUsersRepository, fakeUserTokenRepository, fakeDateProvider, fakeHashProvider);
  });

  it("should be able to reset password", async () =>
  {
    const user = await fakeUsersRepository.create(
    {
      name: "test",
      email: "test@test.com",
      password: "old_password"
    });
  
    const { token } = await fakeUserTokenRepository.generate(user.id);
  
    const request = 
    {
      token: token,
      password: "new_password"
    };
        
    await resetPassword.execute({ token: request.token, password: request.password });

    const updatedUser = await fakeUsersRepository.findByEmail(user.email);

    expect(updatedUser?.password).toEqual(request.password);
  });

  it("should not be able possible to reset the password with an incorrect token", async () =>
  {
    const user = await fakeUsersRepository.create(
    {
      name: "test",
      email: "test@test.com",
      password: "old_password"
    });
  
    const request = 
    {
      token: "invalid_token",
      password: "new_password"
    };
        
    expect(resetPassword.execute({ token: request.token, password: request.password }))
    .rejects
    .toBeInstanceOf(AppError);
  });

  it("should not be able possible to reset the password with an non-existent user", async () =>
  {
    const user = await fakeUsersRepository.create(
    {
      name: "test",
      email: "test@test.com",
      password: "old_password",
    });
    
    const { token } = await fakeUserTokenRepository.generate(user.id);

    await fakeUsersRepository.delete(user.id);
      
    const request = 
    {
      token: token,
      password: "new_password"
    };
        
    expect(resetPassword.execute({ token: request.token, password: request.password }))
    .rejects
    .toBeInstanceOf(AppError);
  });

  it("should not be able possible to reset the password with an expired token", async () =>
  {
    const user = await fakeUsersRepository.create(
    {
      name: "test",
      email: "test@test.com",
      password: "old_password",
    });
    
    const { id, token } = await fakeUserTokenRepository.generate(user.id);
      
    const request = 
    {
      token: token,
      password: "new_password"
    };

    await fakeUserTokenRepository.decreaseHours(id, 3);
        
    expect(resetPassword.execute({ token: request.token, password: request.password })).rejects.toBeInstanceOf(AppError);
  });
});