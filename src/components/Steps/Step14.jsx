import React, { useState } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step14 = ({ formData, updateFormData, onBack, onNext }) => {
    const { errors, validateAll, clearError } = useFormValidation();
   
    const [valueIn90Degree, setValueIn90Degree] = useState('');
    const [valueIn45Degree, setValueIn45Degree] = useState('');
    const [valueIn30Degree, setValueIn30Degree] = useState('');
    const [valueOut90Degree, setValueOut90Degree] = useState('');
    const [valueOut45Degree, setValueOut45Degree] = useState('');
    const [valueOut30Degree, setValueOut30Degree] = useState('');

    const handleIn90Dergree = (e) => {
        const value = e.target.value;
        setValueIn90Degree(value);
        updateFormData({ Количество_поворотов_в_котельной_90: value });
        clearError('in90Dergree'); 
    };

    const handleIn45Dergree = (e) => {
        const value = e.target.value;
        setValueIn45Degree(value);
        updateFormData({ Количество_поворотов_в_котельной_45: value });
        clearError('in45Dergree'); 
    };

    const handleIn30Dergree = (e) => {
        const value = e.target.value;
        setValueIn30Degree(value);
        updateFormData({ Количество_поворотов_в_котельной_30: value });
        clearError('in30Dergree'); 
    };

    const handleOut90Dergree = (e) => {
        const value = e.target.value;
        setValueOut90Degree(value);
        updateFormData({ Количество_поворотов_на_улице_90: value });
        clearError('out90Dergree');
    };

    const handleOut45Dergree = (e) => {
        const value = e.target.value;
        setValueOut45Degree(value);
        updateFormData({ Количество_поворотов_на_улице_45: value });
        clearError('out45Dergree');
    };

    const handleOut30Dergree = (e) => {
        const value = e.target.value;
        setValueOut30Degree(value);
        updateFormData({ Количество_поворотов_на_улице_30: value });
        clearError('out30Dergree');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        const fields = {
            in90Dergree: valueIn90Degree || valueIn45Degree || valueIn30Degree,  
            in90Dergree_rules: { oneof: true, number: true },  
            in45Dergree: valueIn45Degree || valueIn90Degree || valueIn30Degree,  
            in45Dergree_rules: { oneof: true, number: true }, 
            in30Dergree: valueIn45Degree || valueIn90Degree || valueIn30Degree,  
            in30Dergree_rules: { oneof: true, number: true }, 
            out90Dergree: valueOut90Degree || valueOut45Degree || valueOut30Degree,  
            out90Dergree_rules: { oneof: true, number: true },  
            out45Dergree: valueOut45Degree || valueOut90Degree || valueOut30Degree,  
            out45Dergree_rules: { oneof: true, number: true }, 
            out30Dergree: valueOut45Degree || valueOut90Degree || valueOut30Degree,  
            out30Dergree_rules: { oneof: true, number: true }, 
        };

        const isValid = validateAll(fields);
        if (!isValid) {
            // Нет alert — ошибки под полями
            return;
        }
        
        onNext();  // Переход
    };

    return (
        <div>
            <h4>Высота</h4>
            
            <form onSubmit={handleSubmit}>
                <div className='quest'>В котельной, шт</div>
                <label>
                    <span className='degree'>90°</span>
                    <input
                        type="text"
                        id="In90Degree"
                        name="In90Degree"
                        value={valueIn90Degree}  // Локальное состояние
                        onChange={handleIn90Dergree}
                        placeholder="Количество углов"
                    />
                </label>
                {errors.in90Dergree && <p className="error">{errors.in90Dergree}</p>}
                <br/>
                <label>
                    <span className='degree'>45°</span>
                    <input
                        type="text"
                        id="In45Degree"
                        name="In45Degree"
                        value={valueIn45Degree}  // Локальное состояние
                        onChange={handleIn45Dergree}
                        placeholder="Количество углов"
                    />
                </label>
                {errors.in45Dergree && <p className="error">{errors.in45Dergree}</p>}
                <br/>
                <label>
                    <span className='degree'>30°</span>
                    <input
                        type="text"
                        id="In30Degree"
                        name="In30Degree"
                        value={valueIn30Degree}  // Локальное состояние
                        onChange={handleIn30Dergree}
                        placeholder="Количество углов"
                    />
                </label>
                {errors.in30Dergree && <p className="error">{errors.in30Dergree}</p>}
                <br />
                <div className='quest'>На улице, шт</div>
                <label>
                <span className='degree'>90°</span>
                    <input
                        type="text"
                        id="Out90Degree"
                        name="Out90Degree"
                        value={valueOut90Degree}
                        onChange={handleOut90Dergree}
                        placeholder="Количество углов"
                    />
                </label>
                {errors.out90Dergree && <p className="error">{errors.out90Dergree}</p>}
                <br />
                <label>
                <span className='degree'>45°</span>
                    <input
                        type="text"
                        id="Out45Degree"
                        name="Out45Degree"
                        value={valueOut45Degree}
                        onChange={handleOut45Dergree}
                        placeholder="Количество углов"
                    />
                </label>
                {errors.out45Dergree && <p className="error">{errors.out45Dergree}</p>}
                <br />
                <label>
                <span className='degree'>30°</span>
                    <input
                        type="text"
                        id="Out30Degree"
                        name="Out30Degree"
                        value={valueOut30Degree}
                        onChange={handleOut30Dergree}
                        placeholder="Количество углов"
                    />
                </label>
                {errors.out30Dergree && <p className="error">{errors.out30Dergree}</p>}
                <br />

                {onBack && <button type="button" onClick={onBack}>Назад</button>}
                <button type="submit">Далее</button>
            </form>
        </div>
    );
};

export default Step14;