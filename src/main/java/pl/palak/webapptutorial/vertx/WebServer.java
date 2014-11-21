package pl.palak.webapptutorial.vertx;

import org.vertx.java.core.Handler;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.http.HttpServer;
import org.vertx.java.core.http.HttpServerRequest;
import org.vertx.java.core.http.RouteMatcher;
import org.vertx.java.core.json.JsonObject;
import org.vertx.java.platform.Verticle;

/**
 * Hello world http server
 */
public class WebServer extends Verticle {

    @Override
    public void start() {
        container.logger().info("Starting web server");
        HttpServer httpServer = vertx.createHttpServer();

        RouteMatcher routeMatcher = new RouteMatcher();

        final EventBus eventBus = vertx.eventBus();

        routeMatcher.all("/api/ping", new Handler<HttpServerRequest>() {
            @Override
            public void handle(HttpServerRequest httpServerRequest) {
                container.logger().info("ping");

                JsonObject msg = new JsonObject();
                msg.putString("msg", "ping");

                eventBus.send("pong", msg);

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
        container.logger().info("Web server started");
    }

}
