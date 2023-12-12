import { describe } from "node:test";
import ResetPasswordService from "./ResetPasswordService";
import FakeUsersRepository from "../domain/repositories/fakes/FakeUserRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUserTokenRepository from "../domain/repositories/fakes/FakeUserTokenRepository";
import FakeDateProvider from "../providers/DateProvider/fakes/FakeDateProvider";

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

    it("should be able to create a update password", () =>
    {
        
    });
});