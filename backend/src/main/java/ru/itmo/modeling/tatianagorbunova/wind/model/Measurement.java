package ru.itmo.modeling.tatianagorbunova.wind.model;

import java.sql.Timestamp;

/**
 * Created by tatiana.gorbunova on 13.01.2017.
 */
public class Measurement {
    private Long time;
    private Double speed;
    private Integer index;

    public Measurement() {}

    public Measurement(Long time, Double speed, Integer index) {
        this.time = time;
        this.speed = speed;
        this.index = index;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

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
