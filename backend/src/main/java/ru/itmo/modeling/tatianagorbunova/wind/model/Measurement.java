package ru.itmo.modeling.tatianagorbunova.wind.model;

import java.sql.Timestamp;

/**
 * Created by tatiana.gorbunova on 13.01.2017.
 */
public class Measurement {
    private Long time;
    private Double speed;

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public Double getSpeed() {
        return speed;
    }

    public void setSpeed(Double speed) {
        this.speed = speed;
    }
}
