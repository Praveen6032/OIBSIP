document.addEventListener('DOMContentLoaded', () => {
    const tempInput = document.getElementById('temp-input');
    const inputUnit = document.getElementById('input-unit');
    const outputUnit = document.getElementById('output-unit');
    const convertBtn = document.getElementById('convert-btn');
    const resultText = document.getElementById('result-text');
    const errorMessage = document.getElementById('temp-error');

    // Validate input and enable/disable convert button
    function validateInput() {
        const value = tempInput.value.trim();
        const isValid = !isNaN(value) && value !== '';
        convertBtn.disabled = !isValid;

        if (!isValid && value !== '') {
            errorMessage.textContent = 'Please enter a valid number.';
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
        }

        // Optional: Validate Kelvin (must be >= 0)
        if (isValid && inputUnit.value === 'kelvin' && parseFloat(value) < 0) {
            errorMessage.textContent = 'Kelvin temperature cannot be negative.';
            errorMessage.style.display = 'block';
            convertBtn.disabled = true;
        }
    }

    // Perform temperature conversion
    function convertTemperature(temp, fromUnit, toUnit) {
        let celsius;

        // Convert input to Celsius first
        switch (fromUnit) {
            case 'celsius':
                celsius = temp;
                break;
            case 'fahrenheit':
                celsius = (temp - 32) * 5 / 9;
                break;
            case 'kelvin':
                celsius = temp - 273.15;
                break;
        }

        // Convert from Celsius to output unit
        switch (toUnit) {
            case 'celsius':
                return { value: celsius, unit: '°C' };
            case 'fahrenheit':
                return { value: (celsius * 9 / 5) + 32, unit: '°F' };
            case 'kelvin':
                return { value: celsius + 273.15, unit: 'K' };
        }
    }

    // Update result display
    function updateResult() {
        const temp = parseFloat(tempInput.value);
        const fromUnit = inputUnit.value;
        const toUnit = outputUnit.value;

        if (isNaN(temp)) {
            resultText.textContent = 'N/A';
            return;
        }

        const result = convertTemperature(temp, fromUnit, toUnit);
        resultText.textContent = `${result.value.toFixed(2)} ${result.unit}`;
    }

    // Event listeners
    tempInput.addEventListener('input', validateInput);
    inputUnit.addEventListener('change', validateInput);
    convertBtn.addEventListener('click', updateResult);

    // Initial validation
    validateInput();
});