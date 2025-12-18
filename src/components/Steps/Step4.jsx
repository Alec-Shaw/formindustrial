import React from 'react';

const Step4 = ({ formData, updateFormData, onNext, onBack }) => {
    const handleChange = (e) => {
        const value = e.target.value;
       // const question = e.target.dataset.question;  // Читаем data-question из input
       
        updateFormData({ 
            Что_требуется: value,  
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Валидация по старому ключу (formData.step4)
        if (!formData.Что_требуется) {
            alert('Выберите вариант!');
            return;
        }
        onNext();
    };

    return (
        <div>
            <h4>Что требуется</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="radio" 
                        id="option1" 
                        name="step4" 
                        value="Только АЭ без чертежа" 
                        onChange={handleChange} 
                    />
                    
                        Только АЭ без чертежа
                    
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        id="option2" 
                        name="step4" 
                        value="Только чертеж без АЭ" 
                        onChange={handleChange} 
                    />
                    
                       Только чертеж без АЭ
                   
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        id="option3" 
                        name="step4" 
                        value="АЭ + Чертеж"                     
                        onChange={handleChange} 
                    />
                    
                        АЭ + Чертеж
                    </label>
                
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step4;