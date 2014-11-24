package pl.palak.webapptutorial.vertx;

import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.platform.Verticle;

/**
 *Hello world http server
 *
 *  -conf conf.json
 *  -instances 10
 */
public class WebServer extends Verticle{

    @Override
    public void start() {
        vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
            @Override
            public void handle(HttpServerRequest httpServerRequest) {
                httpServerRequest.response().end("Hello world!");
            }
        }).listen(8080);
    }
}
