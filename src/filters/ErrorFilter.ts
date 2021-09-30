import { ArgumentsHost, Catch, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";

@Catch()
export class ErrorFilter extends BaseExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const next = ctx.getNext();

        if (exception instanceof HttpException) {
            super.catch(exception, host);
        }

        this.applicationRef.reply(host.getArgByIndex(1), response.body, 500);
    }
}
