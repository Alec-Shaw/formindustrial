import React from 'react';

function Step1({ formData, updateFormData, onNext, onBack }) {
    const handleChange = (e) => {
        updateFormData({ step1: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <div>
            <h4>Подключение, вывод котлов</h4>
            <form onSubmit={handleSubmit}>
            <div className="custom-radio">
                <label>
                    <input type="radio" name="step1" value="На каждый котел свой отдельный дымоход" onChange={handleChange} />
                    На каждый котел свой отдельный дымоход
                </label>
                </div>
                <br />
                <label>
                    <input type="radio" name="step1" value="Несколько котлов в один вертикальный дымоход" onChange={handleChange} />
                    Несколько котлов в один вертикальный дымоход
                </label>
                <br />
                <label>
                    <input type="radio" name="step1" value="Несколько котлов с общим горизонтальным участком" onChange={handleChange} />
                    Несколько котлов с общим горизонтальным участком
                </label>
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
}

export default Step1;