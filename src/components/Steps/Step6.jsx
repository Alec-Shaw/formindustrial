import React from 'react';

const Step6 = ({ formData, updateFormData, onNext, onBack }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        // const question = e.target.dataset.question;  // Читаем data-question из input

        updateFormData({
            Марка_или_модель_котла: value,
        });
    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        let swer = formData.Марка_или_модель_котла;
        // Валидация по formData (синхронно с handleChange)
        const selectedValue = swer || '';
        console.log('Step6 submit: selectedValue =', selectedValue);  // Лог: теперь заполнено
        if (!selectedValue || selectedValue.trim() === '') {
            alert('Выберите вариант!');
            return;
        }
        onNext(selectedValue);  // Передача в getNextStep (если ветвление от Step6)
    };
    return (
        <div>
            <h4>Марка или модель котла</h4>
            <form onSubmit={handleSubmit}>
                <select id="mySelect" name="step6" onChange={handleChange}>
                     <option value="" > </option>
                    <option value="Bosh">Bosh</option>
                    <option value="Protherm" >Protherm</option>
                    <option value="Acrus">Acrus</option>
                    <option value="Baxi" >Baxi</option>
                    <option value="Другой котел" >Другой котел</option>
                </select>

                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step6;