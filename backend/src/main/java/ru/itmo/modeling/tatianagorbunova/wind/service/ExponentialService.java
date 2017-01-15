package ru.itmo.modeling.tatianagorbunova.wind.service;

import ru.itmo.modeling.tatianagorbunova.wind.model.Measurement;

import java.util.List;

/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */
public interface ExponentialService {
    List<Measurement> getExponentialData(Double k);
}
