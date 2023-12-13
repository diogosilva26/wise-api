import "reflect-metadata";
import { describe } from "node:test";
import FakeUsersRepository from "../../domain/repositories/fakes/FakeUserRepository";
import FakeUserTokenRepository from "../../domain/repositories/fakes/FakeUserTokenRepository";
import AppError from "@shared/erros/AppError";
import SendForgotPasswordEmailService from "../SendForgotPasswordEmailService";
import FakeSendEmailProvider from "@modules/users/providers/SendEmailProvider/fakes/FakeSendEmailProvider";

let forgotPassword: SendForgotPasswordEmailService;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeSendEmailProvider: FakeSendEmailProvider;

describe("Send forgot password email", () =>
{
  beforeEach(() =>
  {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeSendEmailProvider = new FakeSendEmailProvider()

    forgotPassword = new SendForgotPasswordEmailService(fakeUsersRepository, fakeUserTokenRepository, fakeSendEmailProvider);
  });

  it("should be able to send forgot email", async () =>
  {
    const user = await fakeUsersRepository.create(
    {
        name: "test",
        email: "test@test.com",
        password: "old_password"
    });
      
    expect(forgotPassword.execute({ email: user.email })).resolves.not.toBeInstanceOf(AppError);
  });

  it("should not be able possible to send forgot email with an non-existent user", async () =>
  {
    const user = await fakeUsersRepository.create(
    {
        name: "test",
        email: "test@test.com",
        password: "old_password"
    });

    await fakeUsersRepository.delete(user.id);
      
    expect(forgotPassword.execute({ email: user.email })).rejects.toBeInstanceOf(AppError);
  });
});