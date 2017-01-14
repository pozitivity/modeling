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
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by tatiana.gorbunova on 13.01.2017.
 */
@Service
public class MeasurementServiceImpl implements MeasurementService {

    private static final String PATH_TO_EXCEL = ".\\\\src\\\\main\\\\resources\\\\wind.xlsx";
    List<Measurement> measurements = new ArrayList<>();

    @Override
    public List<Measurement> getMeasurements() {
        readExcel();
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
                        measurement.setTime(cell.getNumericCellValue());
                        cell = cellIterator.next();
                        measurement.setSpeed(cell.getNumericCellValue());
                    }
                }
                measurements.add(measurement);
            }
            file.close();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}
