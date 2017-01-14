package ru.itmo.modeling.tatianagorbunova.wind;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;

@SpringBootApplication
public class WindApplication extends SpringBootServletInitializer {

    public static void main(String args[]) {
        SpringApplication.run(WindApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(WindApplication.class);
    }
}
