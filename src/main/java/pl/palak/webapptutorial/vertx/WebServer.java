package pl.palak.webapptutorial.vertx;

import org.vertx.java.core.Handler;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.platform.Verticle;

/**
 * Hello world http server
 */
public class WebServer extends Verticle {

    @Override
    public void start() {
        HttpServer httpServer = vertx.createHttpServer();

        RouteMatcher routeMatcher = new RouteMatcher();

        routeMatcher.all("/api/ping", new Handler<HttpServerRequest>() {
            @Override
            public void handle(HttpServerRequest httpServerRequest) {
                httpServerRequest.response().end("hello api!");
            }
        });

        routeMatcher.noMatch(new Handler<HttpServerRequest>() {
            @Override
            public void handle(HttpServerRequest httpServerRequest) {
                String file = httpServerRequest.path().equals("/") ? "index.html" : httpServerRequest.path();
                httpServerRequest.response().sendFile("web/" + file);
            }
        });

        httpServer.requestHandler(routeMatcher);

        httpServer.listen(8080);
    }

}
