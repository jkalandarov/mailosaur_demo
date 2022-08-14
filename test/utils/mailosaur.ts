import {credentials} from "../../configs/mailosaur.credentials";
import * as models from "../../node_modules/mailosaur/lib/models";
// @ts-ignore
import { MailosaurClient } from "../../node_modules/mailosaur"

const mailosaur = new MailosaurClient(credentials.apiKey);

class Mailosaur {
    readonly userName: string;

    constructor(userName: string) {
        this.userName = userName;
    }

    get serverId(): string {
        return credentials.serverId;
    }

    get apiKey(): string {
        return credentials.apiKey;
    }

    get serverDomain(): string {
        return credentials.serverDomain;
    }

    async sendTo(to: string, message: string, subject: string): Promise<void> {
        await mailosaur.messages.create(this.serverId, {
            to, subject, html: message, send: true
        });
    }

    async get(
        serverId = this.serverId,
        criteria: object,
        options?: models.SearchOptions
    ): Promise<models.Message> {
        return await mailosaur.messages.get(serverId, criteria, options);
    }

    async getById(messageId: string): Promise<models.Message> {
        return await mailosaur.messages.getById(messageId);
    }

}

module.exports = new Mailosaur('jkalandarov');