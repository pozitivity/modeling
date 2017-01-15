package ru.itmo.modeling.tatianagorbunova.wind.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.itmo.modeling.tatianagorbunova.wind.model.Measurement;
import ru.itmo.modeling.tatianagorbunova.wind.service.ExponentialService;
import ru.itmo.modeling.tatianagorbunova.wind.service.MeasurementService;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */
@Service
public class ExponentialServiceImpl implements ExponentialService {

    @Autowired
    MeasurementService measurementService;

    List<Measurement> exponentialData = new ArrayList<>();

    @Override
    public List<Measurement> getExponentialData(Double k) {
        exponentialData.clear();
        List<Measurement> measurements = measurementService.getMeasurements();
        Double firstValueSpeed = (measurements.get(0).getSpeed() + measurements.get(1).getSpeed() + measurements.get(2).getSpeed())/3;
        exponentialData.add(new Measurement(measurements.get(0).getTime(), firstValueSpeed, 1));

        for(Measurement measurement: measurements) {
            //Measurement measurement = new Measurement();
            if (exponentialData.size() < measurements.size())
                exponentialData.add(new Measurement(measurements.get(measurement.getIndex()).getTime(),
                        k * measurements.get(measurement.getIndex()).getSpeed() + (1 - k) * exponentialData.get(measurements.get(measurement.getIndex() - 1).getIndex() - 1).getSpeed(),
                        measurement.getIndex() + 1));
        }

        return exponentialData;
    }
}
