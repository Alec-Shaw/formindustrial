import React from 'react';

const Step7 = ({ formData, updateFormData, onNext, onBack }) => {
    const handleChange = (e) => {
        const value = e.target.value;
        
       // const question = e.target.dataset.question;  // Читаем data-question из input
       
        updateFormData({ 
            Тип_топлива: value,  
        });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Валидация по старому ключу (formData.step4)
        if (!formData.Тип_топлива) {
            alert('Выберите вариант!');
            return;
        }
        onNext();
    };

    return (
        <div>
            <h4>Тип топлива</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    <input 
                        type="radio" 
                        id="option1" 
                        name="step7" 
                        value="Газ" 
                        onChange={handleChange} 
                    />
                    Газ
                    
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        id="option2" 
                        name="step7" 
                        value="Дизель" 
                        onChange={handleChange} 
                    />
                    
                       Дизель
                   
                </label>
                <br />
                 <label>
                    <input 
                        type="radio" 
                        id="option3" 
                        name="step7" 
                        value="Газ/дизел" 
                        onChange={handleChange} 
                    />

                     Газ/дизел
                   
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        id="option4" 
                        name="step7" 
                        value="Дрова" 
                        onChange={handleChange} 
                    />
                    
                     Дрова
                   
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        id="option5" 
                        name="step7" 
                        value="Уголь" 
                        onChange={handleChange} 
                    />
                    
                     Уголь
                   
                </label>
                <br />
                <label>
                    <input 
                        type="text" 
                        id="option6" 
                        name="step7" 
                        onChange={handleChange} 
                    />
                    
                     Свой вариант
                   
                </label>
                
                <br />
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step7;