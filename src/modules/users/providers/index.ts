import { container } from "tsyringe";

import { IHashProvider } from "./HashProvider/models/IHashProvider";
import BcryptHashProvider from "./HashProvider/implementations/BcryptHashProvider";
import { IDateProvider } from "./DateProvider/models/IDateProvider";
import DateFnsDateProvider from "./DateProvider/implementations/DateFnsDateProvider";
import { ISendEmailProvider } from "./SendEmailProvider/models/ISendEmailProvider";
import EtherealMailSendEmailProvider from "./SendEmailProvider/implementations/EtherealMailSendEmailProvider";

container.registerSingleton<IHashProvider>("HashProvider", BcryptHashProvider);
container.registerSingleton<IDateProvider>("DateProvider", DateFnsDateProvider);
container.registerSingleton<ISendEmailProvider>("SendEmailProvider", EtherealMailSendEmailProvider);