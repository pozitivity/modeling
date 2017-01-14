/**
 * Created by tatiana.gorbunova on 03.12.2016.
 */
function tryGetEnvironmentVariable(variableName, defaultValue) {
    var value = process.env[variableName];
    if (value === undefined || value === null) {
        value = defaultValue;
    } else if (value === 'null') { // handle empty string values set by frontend-maven-plugin
        value = '';
    }
    return JSON.stringify(value);
}

module.exports = tryGetEnvironmentVariable;