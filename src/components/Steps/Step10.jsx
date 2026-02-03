import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step10 = ({ formData, updateFormData, onBack, onNext }) => {
    const { errors, validateAll, clearError } = useFormValidation();
   
    const [expandedLength, setExpandedLength] = useState('');
    const [straightLength, setStraightLength] = useState('');

    const handleInBoilerRoom = (e) => {
        const value = e.target.value;
        setExpandedLength(value);
        updateFormData({ Длина_развернутая_в_котельной: value });
        clearError('inBoilerRoom');  
    };

    const handleOutBoilerRoom = (e) => {
        const value = e.target.value;
        setStraightLength(value);
        updateFormData({ Длина_развернутая_на_улице: value });
        clearError('outBoilerRoom');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const fields = {
            inBoilerRoom: expandedLength,  
            inBoilerRoom_rules: { required: true, number: true },  
            outBoilerRoom: straightLength,  
            outBoilerRoom_rules: { required: true, number: true }, 
        };

        const isValid = validateAll(fields);
        if (!isValid) {
            
            return;
        }
        
        onNext();  
    };

    return (
        <div>
            <h4>Длина развернутая в котельной или на улице</h4>
            
            <form onSubmit={handleSubmit}>
                <div className='quest'>В котельной</div>
                <label>
                    <input
                        type="text"
                        id="expanded"
                        name="expanded"
                        value={expandedLength}  
                        onChange={handleInBoilerRoom}
                        placeholder="Введите значение"
                    />
                </label>
                {errors.inBoilerRoom && <p className="error">{errors.inBoilerRoom}</p>}
                
                <div className='quest'>На улице</div>
                <label>
                    <input
                        type="text"
                        id="elongate"
                        name="elongate"
                        value={straightLength}
                        onChange={handleOutBoilerRoom}
                        placeholder="Введите значение"
                    />
                </label>
                {errors.outBoilerRoom && <p className="error">{errors.outBoilerRoom}</p>}
                <br />
                
                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step10;