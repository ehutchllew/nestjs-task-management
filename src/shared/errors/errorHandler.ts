import { Injectable, Module } from "@nestjs/common";

@Injectable()
export class ErrorHandlerService {
    constructor() {
        console.log("Instantiating Error Handler Service");
    }
}

@Module({
    providers: [ErrorHandlerService],
    exports: [ErrorHandlerService],
})
export class ErrorHandlerModule {}
