import "reflect-metadata";
import CreateUserService from "./CreateUserService";
import FakeUsersRepository from "../domain/repositories/fakes/FakeUserRepository";
import AppError from "@shared/erros/AppError";

describe("CreateUser", () =>
{
    it("shoud be a able to create a new user", async () =>
    {
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(fakeUsersRepository);

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
        const fakeUsersRepository = new FakeUsersRepository();

        const createUser = new CreateUserService(fakeUsersRepository);

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