package ru.itmo.modeling.tatianagorbunova.wind.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import ru.itmo.modeling.tatianagorbunova.wind.model.Measurement;
import ru.itmo.modeling.tatianagorbunova.wind.service.MeasurementService;

import java.util.List;

/**
 * Created by tatiana.gorbunova on 13.01.2017.
 */
@RestController
@RequestMapping(value = "/api/measurement")
public class MeasurementController {
    @Autowired
    MeasurementService measurementService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Measurement> getMeasurements() {
        return measurementService.getMeasurements();
    }
}
