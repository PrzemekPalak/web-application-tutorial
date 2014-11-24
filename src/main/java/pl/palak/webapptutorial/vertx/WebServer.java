package pl.palak.webapptutorial.vertx;

import org.vertx.java.core.AsyncResult;
import org.vertx.java.core.AsyncResultHandler;
import org.vertx.java.core.Handler;
import org.vertx.java.core.buffer.Buffer;
import org.vertx.java.core.eventbus.EventBus;
import org.vertx.java.core.eventbus.Message;
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
            public void handle(final HttpServerRequest httpServerRequest) {
                container.logger().info("ping");

                JsonObject msg = new JsonObject();
                msg.putString("msg", "ping");

                eventBus.send("pong", msg, new Handler<Message<JsonObject>>() {
                    @Override
                    public void handle(Message<JsonObject> message) {
                        container.logger().info("Received message form event bus module: "+message.body().encodePrettily());
                        httpServerRequest.response().end(message.body().encodePrettily());
                    }
                });

            }
        });

        routeMatcher.get("/api/clientList", new Handler<HttpServerRequest>() {
            @Override
            public void handle(final HttpServerRequest httpServerRequest) {
                //send with timeout
                eventBus.sendWithTimeout("clientList", new JsonObject(), 100, new AsyncResultHandler<Message<JsonObject>>() {
                    @Override
                    public void handle(AsyncResult<Message<JsonObject>> messageAsyncResult) {
                        if (messageAsyncResult.failed()) {
                            httpServerRequest.response().setStatusCode(500).end();
                        } else {
                            httpServerRequest.response().end(messageAsyncResult.result().body().encodePrettily());
                        }
                    }
                });
            }
        });

        routeMatcher.post("/api/client", new Handler<HttpServerRequest>() {
            @Override
            public void handle(final HttpServerRequest httpServerRequest) {
                //return empty response
                httpServerRequest.response().end();

                httpServerRequest.bodyHandler(new Handler<Buffer>() {
                    public void handle(Buffer body) {
                        // The entire body has now been received
                        String bodyStr = body.getString(0, body.length());
                        JsonObject clientJson = new JsonObject(bodyStr);
                        //send with timeout
                        eventBus.send("submitClient", clientJson);
                    }
                });

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
