import "reflect-metadata";
import CreateUserService from "../CreateUserService";
import FakeUsersRepository from "../../domain/repositories/fakes/FakeUserRepository";
import AppError from "@shared/erros/AppError";
import FakeHashProvider from "../../providers/HashProvider/fakes/FakeHashProvider";

let createUser: CreateUserService;
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

describe("CreateUser", () =>
{
    beforeEach(() => 
    {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    });

    it("shoud be a able to create a new user", async () =>
    {
        const user = await createUser.execute(
        {
            name: "kazumyo", 
            email: "kazumyo@test.com",
            password: "kazumyo123"
        });

        expect(user).toHaveProperty("id");
    });

    it("shoud not be a able to create a two users with the same email", async () =>
    {
        await createUser.execute(
        {
            name: "kazumyo", 
            email: "kazumyo@test.com",
            password: "kazumyo123"
        });

        expect(
            createUser.execute(
            {
                name: "caio", 
                email: "kazumyo@test.com",
                password: "caio123"
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});