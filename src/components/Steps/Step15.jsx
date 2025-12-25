import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step15 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();
  
    const [selectedDiametr, setSelectedDiametr] = useState('');
    const [selectedInsulation, setSelectedInsulation] = useState('');

    const handleDiametrChange = (e) => {
        const value = e.target.value;
        setSelectedDiametr(value);
        updateFormData({ Диаметр_дымохода: value });
        clearError('diametrChimney');  
    };

    const handleInsulationChange = (e) => {
        const value = e.target.value;
        setSelectedInsulation(value);
        updateFormData({ Изоляция: value });
        clearError('insulationChimney');  
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            diametrChimney: selectedDiametr,  
            diametrChimney_rules: { required: true },  
            insulationChimney: selectedInsulation,  
            insulationChimney_rules: { required: true },  
        };

        const isValid = validateAll(fields);
        if (!isValid) {
            return;
        }
        onNext();  
    };

    return (
        <div>
            <h4>Диаметр дымохода</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        type="radio"
                        id="option1"
                        name="step15"
                        value="Известен - строго фиксирован"
                        checked={selectedDiametr === "Известен - строго фиксирован"}
                        onChange={handleDiametrChange}
                    />
                    Известен - строго фиксирован
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="step15"
                        value="Известен перепроверить АЭ"
                        checked={selectedDiametr === "Известен перепроверить АЭ"}
                        onChange={handleDiametrChange}
                    />
                    Известен перепроверить АЭ
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option3"
                        name="step15"
                        value="Определить АЭ"
                        checked={selectedDiametr === "Определить АЭ"}
                        onChange={handleDiametrChange}
                    />
                    Определить АЭ
                </label>
                {errors.diametrChimney && <p className="error">{errors.diametrChimney}</p>}
                <br />
                <h4>Изоляция</h4>
                <label>
                    <input
                        type="radio"
                        id="option1"
                        name="insulation"
                        value="Да - 50 рекомендуемая"
                        checked={selectedInsulation === "Да - 50 рекомендуемая"}
                        onChange={handleInsulationChange}
                    />
                    Да - 50 рекомендуемая
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option2"
                        name="insulation"
                        value="Да - 25 в обоснованных случаях"
                        checked={selectedInsulation === "Да - 25 в обоснованных случаях"}
                        onChange={handleInsulationChange}
                    />
                    Да - 25 в обоснованных случаях
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option3"
                        name="insulation"
                        value="Нет"
                        checked={selectedInsulation === "Нет"}
                        onChange={handleInsulationChange}
                    />
                    Нет
                </label>
                 <br />
                <label>
                    <input
                        type="radio"
                        id="option3"
                        name="insulation"
                        value="В теплых 1 стен, в холодных 50"
                        checked={selectedInsulation === "В теплых 1 стен, в холодных 50"}
                        onChange={handleInsulationChange}
                    />
                    В теплых 1 стен, в холодных 50
                </label>
                <br />
                <label>
                    <input
                        type="radio"
                        id="option3"
                        name="insulation"
                        value="В теплых 1 стен, в холодных 25"
                        checked={selectedInsulation === "В теплых 1 стен, в холодных 25"}
                        onChange={handleInsulationChange}
                    />
                    В теплых 1 стен, в холодных 25
                </label>
                {errors.insulationChimney && <p className="error">{errors.insulationChimney}</p>}
                <br />

                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step15;