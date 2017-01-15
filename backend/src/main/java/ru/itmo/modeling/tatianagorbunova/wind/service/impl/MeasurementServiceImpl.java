package ru.itmo.modeling.tatianagorbunova.wind.service.impl;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import ru.itmo.modeling.tatianagorbunova.wind.model.Measurement;
import ru.itmo.modeling.tatianagorbunova.wind.service.MeasurementService;

import java.io.File;
import java.io.FileInputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * Created by tatiana.gorbunova on 13.01.2017.
 */
@Service
public class MeasurementServiceImpl implements MeasurementService {

    List<Measurement> measurements = new ArrayList<>();

    @Override
    public List<Measurement> getMeasurements() {
        if (measurements.size() == 0) readExcel();
        return measurements;
    }

    private void readExcel() {
        try {
            FileInputStream file = new FileInputStream(getClass().getClassLoader().getResource("wind.xlsx").getPath());

            XSSFWorkbook workbook = new XSSFWorkbook(file);
            XSSFSheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rowIterator = sheet.iterator();
            while(rowIterator.hasNext()) {
                Row row = rowIterator.next();
                Iterator<Cell> cellIterator = row.cellIterator();

                Measurement measurement = new Measurement();

                while(cellIterator.hasNext()) {
                    Cell cell = cellIterator.next();
                    if (cell.getCellType() == Cell.CELL_TYPE_NUMERIC) {
                        Double time = cell.getNumericCellValue();
                        measurement.setTime(time.longValue());
                        cell = cellIterator.next();
                        measurement.setSpeed(cell.getNumericCellValue());
                    }
                }
                if (measurement.getTime() != null || measurement.getSpeed() != null)
                    measurements.add(measurement);
            }
            file.close();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
