package ru.itmo.modeling.tatianagorbunova.wind.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.itmo.modeling.tatianagorbunova.wind.model.Measurement;
import ru.itmo.modeling.tatianagorbunova.wind.service.ExponentialService;

import java.util.List;

/**
 * Created by tatiana.gorbunova on 15.01.2017.
 */
@RestController
@RequestMapping(value = "/api/exponential")
public class ExponentialController {

    @Autowired
    ExponentialService exponentialService;

    @RequestMapping(method = RequestMethod.GET)
    public List<Measurement> getExponentialData(@RequestParam Double k) {
        return exponentialService.getExponentialData(k);
    }
}
