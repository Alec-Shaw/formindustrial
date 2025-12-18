import React from 'react';

const Step5 = ({ formData, updateFormData, onNext, onBack }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        
       // const question = e.target.dataset.question;  // Читаем data-question из input
       
        updateFormData({ 
            Одинаковые_или_разные_котлы: value,  
        });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Получаем value синхронно (из формы)
        const selectedValue = e.target.querySelector('input[name="step5"]:checked')?.value || '';
        console.log('Step5 submit: selectedValue =', selectedValue);  // Лог для дебага
        if (!selectedValue) {
            alert('Выберите вариант!');
            return;
        }
        // Передаём value в onNext — переход с условием
        onNext(selectedValue);  
    };

    return (
        <div>
            <h4>Одинаковые или разные котлы</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="radio" 
                        id="option1" 
                        name="step5" 
                        value="Все котлы одинаковые" 
                        onChange={handleChange} 
                    />
                    Все котлы одинаковые
                    
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        id="option2" 
                        name="step5" 
                        value="Разные котлы" 
                        onChange={handleChange} 
                    />
                    
                       Разные котлы
                   
                </label>
                <br />
                
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step5;