import React from 'react';
import { useNavigate } from 'react-router-dom';

const Step0 = ({ updateFormData }) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedValue = e.target.step0.value;
        updateFormData({ step0: selectedValue });
        if (selectedValue === "Промышленная") {
            navigate('/industrial');
        } else if (selectedValue === "Поквартирная") {
            navigate('/apartment'); // Добавь роут для этой ветки
        } else if (selectedValue === "ДРОП") {
            navigate('/drop'); // Добавь роут
        }
    };

    return (
        <div>
            <h3>Шаг 0: Тип дымоходной системы</h3>
            <form onSubmit={handleSubmit}>
            
                <label>
                    <input type="radio" name="step0" value="Промышленная" required />
                    Промышленная
                </label>
                
                <br />
                <label>
                    <input type="radio" name="step0" value="Поквартирная" required />
                    Поквартирная коллективная
                </label>
                <br />
                <label>
                    <input type="radio" name="step0" value="ДРОП" required />
                    ДРОП (конденсационная)
                </label>
                <br />
                <button type="submit">Продолжить</button>
            </form>
        </div>
    );
}

export default Step0;