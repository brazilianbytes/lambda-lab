import {
    APIGatewayProxyEvent,
    APIGatewayProxyEventV2,
    APIGatewayProxyResult,
    APIGatewayProxyStructuredResultV2,
    Context
} from 'aws-lambda';
import {ExpressAdapter, NestExpressApplication} from "@nestjs/platform-express";
import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import ServerlessHttp from "serverless-http";

export const handler: ServerlessHttp.Handler = async (
    event: APIGatewayProxyEvent | APIGatewayProxyEventV2,
    context: Context
): Promise<APIGatewayProxyResult | APIGatewayProxyStructuredResultV2> => {
    console.debug(JSON.stringify({event, context}, null, 2))

    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
    await app.init();

    return ServerlessHttp(app.getHttpAdapter().getInstance())(event, context);
}

process.on('SIGINT', function () {
    console.log("Caught interrupt signal");
    process.exit();
});
