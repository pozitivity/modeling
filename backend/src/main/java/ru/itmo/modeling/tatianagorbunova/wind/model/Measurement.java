package ru.itmo.modeling.tatianagorbunova.wind.model;

import java.sql.Timestamp;

/**
 * Created by tatiana.gorbunova on 13.01.2017.
 */
public class Measurement {
    private Double time;
    private Double speed;

    public Double getTime() {
        return time;
    }

    public void setTime(Double time) {
        this.time = time;
    }

    public Double getSpeed() {
        return speed;
    }

    public void setSpeed(Double speed) {
        this.speed = speed;
    }
}
