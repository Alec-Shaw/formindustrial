import React, { useState, useEffect } from 'react';
import { useFormValidation } from '../hooks/useFormValidation';  

const Step21 = ({ formData, updateFormData, onNext, onBack }) => {
    const { errors, validateAll, clearError } = useFormValidation();

    const [gazoanaliz, setGazoanaliz] = useState('Нет');
    const [shiber, setShiber] = useState('Нет');
    const [klapan, setKlapan] = useState('Нет');
    const [reviziya, setReviziya] = useState('Нет');

   
    useEffect(() => {
        if (formData.Элемент_для_газоанализа) setGazoanaliz(formData.Элемент_для_газоанализа);
        if (formData.Шибер) setShiber(formData.Шибер);
        if (formData.Взрывной_клапан) setKlapan(formData.Взрывной_клапан);
        if (formData.Ревизия) setReviziya(formData.Ревизия);
        if (formData.Элемент_для_газоанализа === undefined || formData.Шибер === undefined || formData.Взрывной_клапан === undefined || formData.Ревизия === undefined) {
            updateFormData({
                Элемент_для_газоанализа: 'Нет',
                Шибер: 'Нет',
                Взрывной_клапан: 'Нет',
                Ревизия: 'Нет'
            });
        }
    }, [formData.Элемент_для_газоанализа, formData.Шибер, formData.Взрывной_клапан, formData.Ревизия, updateFormData]);

    
    const handleGazoanalizChange = (e) => {
        const value = e.target.value;
        setGazoanaliz(value);
        updateFormData({ Элемент_для_газоанализа: value });
        clearError('Элемент_для_газоанализа');  
    };

    const handleShiberChange = (e) => {
        const value = e.target.value;
        setShiber(value);
        updateFormData({ Шибер: value });
        clearError('Шибер');
    };

    const handleKlapanChange = (e) => {
        const value = e.target.value;
        setKlapan(value)
        updateFormData({ Взрывной_клапан: value });
        clearError('Взрывной_клапан');
    };

    const handleReviziyaChange = (e) => {
        const value = e.target.value;
        setReviziya(value)
        updateFormData({ Ревизия: value });
        clearError('Ревизия');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validation fields object
        const fields = {
            Элемент_для_газоанализа: formData.Элемент_для_газоанализа || gazoanaliz,  
            Элемент_для_газоанализа_rules: { required: true },  
            Шибер: formData.Шибер || shiber,
            Шибер_rules: { required: true },
            Взрывной_клапан: formData.Взрывной_клапан || klapan,
            Взрывной_клапан_rules: { required: true },  
            Ревизия: formData.Ревизия || reviziya,
            Ревизия_rules: { required: true },
        };

        const isValid = validateAll(fields);
        if (!isValid) {
           
            return;
        }
        onNext();
    };

    return (
        <div className='img_right'>
            <div>
                <h4>Необходимость дополнительных элементов</h4>
                <form onSubmit={handleSubmit}>
                    <div className='quest'>Элемент для газоанализа</div>
                    <label>
                        <input
                            type="radio"
                            id="option1"
                            name="gazoanaliz"
                            value="Да"
                            checked={gazoanaliz === 'Да'}
                            onChange={handleGazoanalizChange}
                        />
                        Да
                    </label>
                    
                    <label>
                        <input
                            type="radio"
                            id="option2"
                            name="gazoanaliz"
                            value="Нет"
                            checked={gazoanaliz === 'Нет'}
                            onChange={handleGazoanalizChange}
                        />
                        Нет
                    </label>
                    
                    {errors.Элемент_для_газоанализа && <p className="error">{errors.Элемент_для_газоанализа}</p>}
                    
                    <div className='quest'>Шибер</div>
                    <label>
                        <input
                            type="radio"
                            id="option3"
                            name="shiber"
                            value="Да"
                            checked={shiber === 'Да'}
                            onChange={handleShiberChange}
                        />
                        Да
                    </label>
                    
                    <label>
                        <input
                            type="radio"
                            id="option4"
                            name="shiber"
                            value="Нет"
                            checked={shiber === 'Нет'}
                            onChange={handleShiberChange}
                        />
                        Нет
                    </label>
                    {errors.Шибер && <p className="error">{errors.Шибер}</p>}
                    
                    <div className='quest'>Взрывной клапан</div>
                    <label>
                        <input
                            type="radio"
                            id="klapan1"
                            name="klapan"
                            value="Да"
                            checked={klapan === 'Да'}
                            onChange={handleKlapanChange}
                        />
                        Да
                    </label>
                    
                    <label>
                        <input
                            type="radio"
                            id="klapan"
                            name="klapan"
                            onChange={handleKlapanChange}
                            value="Нет"
                            checked={klapan === 'Нет'}
                        />
                        Нет
                    </label>
                    {errors.Взрывной_клапан && <p className="error">{errors.Взрывной_клапан}</p>}
                    
                    <div className='quest'>Ревизия</div>
                    <label>
                        <input
                            type="radio"
                            id="reviziya1"
                            name="reviziya"
                            onChange={handleReviziyaChange}
                            value="Да"
                            checked={reviziya === 'Да'}
                        />
                        Да
                    </label>
                    
                    <label>
                        <input
                            type="radio"
                            id="reviziya2"
                            name="reviziya"
                            onChange={handleReviziyaChange}
                            value="Нет"
                            checked={reviziya === 'Нет'}
                        />
                        Нет
                    </label>
                    {errors.Ревизия && <p className="error">{errors.Ревизия}</p>}
                    <br />
                    {onBack && <button type="button" onClick={onBack}>Назад</button>}
                    <button type="submit">Далее</button>
                </form>
            </div>
            
        </div>
    );
};

export default Step21;