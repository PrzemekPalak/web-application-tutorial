package pl.palak.webapptutorial.vertx;

import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.platform.Verticle;

/**
 *Hello world http server
 *
 */
public class WebServer extends Verticle{

    @Override
    public void start() {
        vertx.createHttpServer().requestHandler(new Handler<HttpServerRequest>() {
            @Override
            public void handle(HttpServerRequest httpServerRequest) {
                String file = httpServerRequest.path().equals("/") ? "index.html" : httpServerRequest.path();
                httpServerRequest.response().sendFile("web/" + file);
            }
        }).listen(8080);
    }
}
